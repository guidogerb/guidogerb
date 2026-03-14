"""Scan submodule READMEs for model download links (HuggingFace, Google Drive, direct)."""
import re
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent / "submodules"
HF_REPO = re.compile(r"huggingface\.co/([A-Za-z0-9_-]+/[A-Za-z0-9._-]+)")
GD_LINK = re.compile(r"drive\.google\.com/[^\s\)\]\>\"']+")
DIRECT_MODEL = re.compile(r"https?://[^\s\)\]\>\"']+\.(gguf|safetensors|ckpt|bin|pt|pth)")

SKIP_ORGS = {"docs", "blog", "spaces", "join", "papers", "datasets", "api",
             "co", "tasks", "models", "hub", "settings", "new", "organizations"}
SKIP_REPOS = {"README", "LICENSE", "CONTRIBUTING"}


def scan_readme(path):
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return None

    hf_repos = set()
    for m in HF_REPO.finditer(text):
        org, repo = m.group(1).split("/", 1)
        repo = repo.rstrip(".,;:")
        if org.lower() in SKIP_ORGS or repo in SKIP_REPOS:
            continue
        if repo.endswith((".md", ".html", ".js", ".py", ".txt")):
            continue
        hf_repos.add(f"{org}/{repo}")

    gd_links = set()
    for m in GD_LINK.finditer(text):
        gd_links.add(m.group(0))

    direct_links = set()
    for m in DIRECT_MODEL.finditer(text):
        direct_links.add(m.group(0))

    if not hf_repos and not gd_links and not direct_links:
        return None

    return {
        "huggingface": sorted(hf_repos),
        "google_drive": sorted(gd_links),
        "direct": sorted(direct_links),
    }


def main():
    results = {}
    for readme in sorted(BASE.glob("*/README.md")):
        sub = readme.parent.name
        data = scan_readme(readme)
        if data:
            results[sub] = data

    print(f"Submodules with model refs: {len(results)}")
    total_hf = 0
    total_gd = 0
    total_direct = 0
    for sub, data in sorted(results.items()):
        hf_count = len(data["huggingface"])
        gd_count = len(data["google_drive"])
        dd_count = len(data["direct"])
        total_hf += hf_count
        total_gd += gd_count
        total_direct += dd_count
        parts = []
        if hf_count:
            parts.append(f"{hf_count} HF")
        if gd_count:
            parts.append(f"{gd_count} GDrive")
        if dd_count:
            parts.append(f"{dd_count} direct")
        print(f"  {sub}: {', '.join(parts)}")
        for r in data["huggingface"][:3]:
            print(f"    HF: {r}")
        if hf_count > 3:
            print(f"    ... +{hf_count - 3} more HF")
        for r in data["google_drive"][:2]:
            print(f"    GD: {r[:80]}")
        for r in data["direct"][:2]:
            print(f"    DD: {r[:80]}")

    print(f"\nTotals: {total_hf} HF repos, {total_gd} GDrive links, {total_direct} direct links")

    out = Path(__file__).resolve().parent / "_model_links.json"
    out.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Saved to {out.name}")


if __name__ == "__main__":
    main()
