#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import json
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

API_BASE = "https://api.github.com"
GITHUB_OWNER = "guidogerb"
START_MARKER = "<!-- SUBMODULE-LIST-START -->"
END_MARKER = "<!-- SUBMODULE-LIST-END -->"
SECTION_TITLE = "## Favorite Projects"
SUPPORTED_PREFIXES = ("submodules/", "third-party-repos/")
MAX_RETRIES = 5


class GitHubApiBlockedError(RuntimeError):
    pass


def _parse_submodule_names(gitmodules_path: Path) -> list[str]:
    names: list[str] = []
    for line in gitmodules_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped.startswith("path = "):
            continue
        path = stripped.split("=", 1)[1].strip()
        if path.startswith(SUPPORTED_PREFIXES):
            names.append(path.rsplit("/", 1)[-1])
    return names


def _retry_delay(exc: urllib.error.HTTPError, body: str, attempt: int) -> int | None:
    if exc.code != 403 or attempt >= MAX_RETRIES:
        return None

    retry_after = exc.headers.get("Retry-After")
    if retry_after and retry_after.isdigit():
        return max(1, int(retry_after))

    lowered_body = body.lower()
    if "secondary rate limit" in lowered_body:
        return min(60, 5 * attempt)

    remaining = exc.headers.get("X-RateLimit-Remaining")
    reset_at = exc.headers.get("X-RateLimit-Reset")
    if remaining == "0" and reset_at and reset_at.isdigit():
        return max(1, int(reset_at) - int(time.time()) + 1)

    if "rate limit exceeded" in lowered_body:
        return min(60, 5 * attempt)

    return None


def _github_request(url: str, token: str | None) -> dict | None:
    ctx = ssl.create_default_context()

    for attempt in range(1, MAX_RETRIES + 1):
        req = urllib.request.Request(url)
        req.add_header("Accept", "application/vnd.github+json")
        req.add_header("User-Agent", "guidogerb-favorites-table")
        req.add_header("X-GitHub-Api-Version", "2022-11-28")
        if token:
            req.add_header("Authorization", f"Bearer {token}")

        try:
            with urllib.request.urlopen(req, context=ctx) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            if exc.code == 404:
                return None
            if exc.code == 403 and "Blocked by DNS monitoring proxy" in body:
                raise GitHubApiBlockedError(body)
            delay = _retry_delay(exc, body, attempt)
            if delay is None:
                raise
            print(
                f"GitHub API rate limited for {url}; retrying in {delay}s (attempt {attempt}/{MAX_RETRIES})",
                file=sys.stderr,
            )
            time.sleep(delay)

    return None


def _fetch_repo(name: str, token: str | None) -> dict | None:
    quoted_name = urllib.parse.quote(name, safe="")
    url = f"{API_BASE}/repos/{GITHUB_OWNER}/{quoted_name}"
    return _github_request(url, token)


def _normalize_description(text: str | None) -> str:
    if not text:
        return ""
    normalized = html.unescape(re.sub(r"<[^>]+>", "", text))
    normalized = " ".join(normalized.replace("\r", "\n").split())
    return normalized.replace("|", r"\|")


def _row_from_api(name: str, data: dict) -> dict[str, str]:
    parent = data.get("parent") or {}
    source = data.get("source") or {}

    upstream_name = (
        parent.get("full_name")
        or source.get("full_name")
        or data.get("full_name")
        or f"{GITHUB_OWNER}/{name}"
    )
    upstream_url = (
        parent.get("html_url")
        or source.get("html_url")
        or data.get("html_url")
        or f"https://github.com/{GITHUB_OWNER}/{name}"
    )
    description = (
        parent.get("description")
        or source.get("description")
        or data.get("description")
        or ""
    )

    return {
        "repository": name,
        "upstream_name": upstream_name,
        "upstream_url": upstream_url,
        "description": _normalize_description(description),
    }


def _search_public_repo(name: str) -> dict[str, str] | None:
    query = urllib.parse.quote(f'"{name}" in:name')
    url = f"https://github.com/search?q={query}&type=repositories"
    with urllib.request.urlopen(url, context=ssl.create_default_context()) as response:
        html_text = response.read().decode("utf-8", errors="replace")

    match = re.search(
        r'<script type="application/json" data-target="react-app\.embeddedData">(.*?)</script>',
        html_text,
        re.DOTALL,
    )
    if not match:
        return None

    payload = json.loads(match.group(1))
    results = payload.get("payload", {}).get("results", [])

    exact_matches = []
    for result in results:
        repo = result.get("repo", {}).get("repository", {})
        repo_name = repo.get("name")
        owner_login = repo.get("owner_login")
        if not repo_name or not owner_login:
            continue
        if repo_name.lower() != name.lower():
            continue
        exact_matches.append(
            {
                "repository": name,
                "upstream_name": f"{owner_login}/{repo_name}",
                "upstream_url": f"https://github.com/{owner_login}/{repo_name}",
                "description": _normalize_description(result.get("hl_trunc_description") or ""),
                "stars": int(result.get("followers") or 0),
            }
        )

    if not exact_matches:
        return None

    exact_matches.sort(key=lambda item: item["stars"], reverse=True)
    best = exact_matches[0].copy()
    best.pop("stars", None)
    return best


def _fallback_row(
    name: str,
    fallback_map: dict[str, dict[str, str]],
) -> dict[str, str]:
    cached = fallback_map.get(name)
    if cached is not None:
        return cached

    public_match = _search_public_repo(name)
    if public_match is not None:
        return public_match

    return {
        "repository": name,
        "upstream_name": f"{GITHUB_OWNER}/{name}",
        "upstream_url": f"https://github.com/{GITHUB_OWNER}/{name}",
        "description": "",
    }


def _build_rows(
    names: list[str],
    token: str | None,
    fallback_map: dict[str, dict[str, str]],
) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    api_blocked = False

    for name in sorted(names, key=lambda item: (item.lower(), item)):
        if api_blocked:
            rows.append(_fallback_row(name, fallback_map))
            continue

        try:
            data = _fetch_repo(name, token)
        except GitHubApiBlockedError:
            api_blocked = True
            print(
                "GitHub REST API is blocked in this environment; falling back to GitHub search results.",
                file=sys.stderr,
            )
            rows.append(_fallback_row(name, fallback_map))
            continue

        if data is None:
            print(f"Skipping missing repository: {GITHUB_OWNER}/{name}", file=sys.stderr)
            continue

        rows.append(_row_from_api(name, data))

    return rows


def _render_table(rows: list[dict[str, str]]) -> str:
    lines = [
        "| Repository | Upstream | Description |",
        "| --- | --- | --- |",
    ]
    for row in rows:
        lines.append(
            f"| {row['repository']} | [{row['upstream_name']}]({row['upstream_url']}) | {row['description']} |"
        )
    return "\n".join(lines)


def _load_fallback_map(path: Path | None) -> dict[str, dict[str, str]]:
    if path is None or not path.is_file():
        return {}

    raw = json.loads(path.read_text(encoding="utf-8"))
    fallback_map: dict[str, dict[str, str]] = {}
    for name, data in raw.items():
        fallback_map[name] = {
            "repository": name,
            "upstream_name": data.get("full_name") or f"{GITHUB_OWNER}/{name}",
            "upstream_url": data.get("html_url") or f"https://github.com/{GITHUB_OWNER}/{name}",
            "description": _normalize_description(data.get("description") or ""),
        }
    return fallback_map


def _update_readme(readme_path: Path, table: str) -> None:
    if readme_path.exists():
        content = readme_path.read_text(encoding="utf-8")
    else:
        content = "# guidogerb\n"

    block = f"{START_MARKER}\n\n{SECTION_TITLE}\n\n{table}\n\n{END_MARKER}"

    if START_MARKER in content and END_MARKER in content:
        start = content.index(START_MARKER)
        end = content.index(END_MARKER) + len(END_MARKER)
        updated = content[:start] + block + content[end:]
    else:
        suffix = "" if content.endswith("\n") else "\n"
        updated = f"{content}{suffix}\n{block}\n"

    readme_path.write_text(updated, encoding="utf-8")


def main() -> int:
    default_repo_dir = Path(__file__).resolve().parent.parent

    parser = argparse.ArgumentParser(
        description="Build the README favorite-projects table from .gitmodules.",
    )
    parser.add_argument(
        "repo_dir",
        nargs="?",
        default=str(default_repo_dir),
        help="Path to the repository root (defaults to this script's parent repository).",
    )
    parser.add_argument(
        "--fallback-map",
        default="",
        help="Optional JSON file containing precomputed upstream metadata.",
    )
    args = parser.parse_args()

    repo_dir = Path(args.repo_dir).resolve()
    gitmodules_path = repo_dir / ".gitmodules"
    readme_path = repo_dir / "README.md"
    fallback_map_path = Path(args.fallback_map).resolve() if args.fallback_map else None

    if not gitmodules_path.is_file():
        print(f"Missing .gitmodules at {gitmodules_path}", file=sys.stderr)
        return 1

    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if not token:
        print(
            "Warning: GITHUB_TOKEN / GH_TOKEN not set; GitHub API requests may be rate limited.",
            file=sys.stderr,
        )

    names = _parse_submodule_names(gitmodules_path)
    fallback_map = _load_fallback_map(fallback_map_path)
    rows = _build_rows(names, token, fallback_map)
    table = _render_table(rows)
    _update_readme(readme_path, table)

    print(f"Processed {len(names)} submodule entries.")
    print(f"Wrote {len(rows)} favorite project rows to {readme_path}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
