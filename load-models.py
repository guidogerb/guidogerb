#!/usr/bin/env python3
"""Stream model files from HuggingFace / direct URLs to s3://ggp-models.

Reads _model_links.json (produced by _scan_models.py) and provides commands
to discover, inspect, and upload model files to the ggp-models S3 bucket.

Requirements: boto3, httpx, huggingface_hub
    pip install boto3 httpx huggingface_hub

Environment variables:
    AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY  — S3 credentials
    HF_TOKEN                                   — HuggingFace token (for gated repos)

Usage:
    python load-models.py list [--submodule NAME]
    python load-models.py inspect ORG/REPO [--filter PATTERN]
    python load-models.py download --repo ORG/REPO [--dry-run] [--prefix PFX]
    python load-models.py download --submodule NAME [--dry-run] [--full-repo]
    python load-models.py download --url URL [--key S3KEY] [--dry-run]
    python load-models.py download --all --yes
    python load-models.py download --all --dry-run
"""
from __future__ import annotations

import argparse
import fnmatch
import hashlib
import json
import math
import os
import re
import sys
from pathlib import Path

BUCKET = "ggp-models"
REGION = "us-east-2"
MODEL_EXTS = frozenset(
    {".safetensors", ".ckpt", ".pt", ".pth", ".bin", ".gguf", ".onnx"}
)
PART_SIZE = 10 * 1024 * 1024  # 10 MB multipart chunks (min 5 MB for S3)
LINKS_FILE = Path(__file__).resolve().parent / "_model_links.json"


# ── helpers ──────────────────────────────────────────────────────────────────


def _h(n: int | float) -> str:
    """Human-readable byte size."""
    for u in ("B", "KB", "MB", "GB", "TB"):
        if abs(n) < 1024:
            return f"{n:.1f} {u}"
        n /= 1024
    return f"{n:.1f} PB"


def _load_links() -> dict | None:
    if not LINKS_FILE.exists():
        print(
            f"ERROR: {LINKS_FILE} not found — run _scan_models.py first.",
            file=sys.stderr,
        )
        return None
    return json.loads(LINKS_FILE.read_text(encoding="utf-8"))


def _s3_client():
    import boto3

    if not os.getenv("AWS_ACCESS_KEY_ID"):
        print(
            "ERROR: set AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY.",
            file=sys.stderr,
        )
        return None
    return boto3.client("s3", region_name=REGION)


def _s3_head(s3, key: str) -> dict | None:
    """Return HEAD metadata dict, or None if the key does not exist."""
    try:
        return s3.head_object(Bucket=BUCKET, Key=key)
    except Exception:
        return None


def _s3_exists(
    s3, key: str, *, expected_sha256: str | None = None, verify: bool = False
) -> bool:
    """Check if *key* exists in S3.  With *verify*, also compare SHA256 metadata."""
    head = _s3_head(s3, key)
    if head is None:
        return False
    if verify and expected_sha256:
        stored = (head.get("Metadata") or {}).get("sha256", "")
        if stored and stored != expected_sha256:
            print(
                f"  HASH  mismatch for {key}  "
                f"stored={stored[:16]}… expected={expected_sha256[:16]}…"
            )
            return False
        if not stored:
            # No hash stored yet — treat as unverified, re-upload
            print(f"  HASH  no sha256 metadata for {key}, will re-upload")
            return False
    return True


def _hf_headers() -> dict:
    tok = os.getenv("HF_TOKEN", "")
    return {"Authorization": f"Bearer {tok}"} if tok else {}


def _progress(done: int, total: int) -> None:
    if total:
        pct = done * 100 / total
        print(
            f"\r        {_h(done):>10} / {_h(total):>10}  ({pct:5.1f}%)",
            end="",
            flush=True,
        )
    else:
        print(f"\r        {_h(done):>10} uploaded", end="", flush=True)


def _parse_hf_url(url: str) -> tuple[str, str] | None:
    """Extract (repo_id, filepath) from a HuggingFace URL."""
    m = re.match(
        r"https?://huggingface\.co/([^/]+/[^/]+)/(?:resolve|blob)/[^/]+/(.*)",
        url,
    )
    return (m.group(1), m.group(2)) if m else None


# ── streaming upload ─────────────────────────────────────────────────────────


def _stream_to_s3(
    s3,
    url: str,
    key: str,
    *,
    headers: dict | None = None,
    dry_run: bool = False,
    expected_sha256: str | None = None,
    verify: bool = False,
) -> bool:
    """Stream *url* directly into s3://BUCKET/key via multipart upload.

    Computes SHA256 on-the-fly and stores it as S3 object metadata.
    When *verify* is True and *expected_sha256* is given, existing objects
    are re-uploaded if their stored hash doesn't match.
    """
    import httpx

    if dry_run:
        tag = ""
        if expected_sha256:
            tag = f"  sha256={expected_sha256[:16]}…"
        print(f"  [DRY] {url}{tag}")
        print(f"        -> s3://{BUCKET}/{key}")
        return True

    if _s3_exists(s3, key, expected_sha256=expected_sha256, verify=verify):
        print(f"  SKIP  s3://{BUCKET}/{key}")
        return True

    hdrs = dict(headers or {})
    hdrs.update(_hf_headers())

    timeout = httpx.Timeout(connect=30.0, read=300.0, write=300.0, pool=30.0)
    sha = hashlib.sha256()

    try:
        with httpx.stream(
            "GET", url, headers=hdrs, follow_redirects=True, timeout=timeout
        ) as resp:
            resp.raise_for_status()
            total = int(resp.headers.get("content-length", 0))
            meta = {}
            if expected_sha256:
                meta["sha256"] = expected_sha256

            # Small file (< 10 MB) → single put_object
            if 0 < total < PART_SIZE:
                body = resp.read()
                sha.update(body)
                digest = sha.hexdigest()
                if expected_sha256 and digest != expected_sha256:
                    print(
                        f"  HASH  CORRUPT download {key}  "
                        f"got={digest[:16]}… expected={expected_sha256[:16]}…"
                    )
                    return False
                if not expected_sha256:
                    meta["sha256"] = digest
                s3.put_object(
                    Bucket=BUCKET, Key=key, Body=body, Metadata=meta
                )
                print(f"  OK    {_h(len(body)):>10}  s3://{BUCKET}/{key}")
                return True

            # Large / unknown-size → multipart upload
            mpu = s3.create_multipart_upload(
                Bucket=BUCKET, Key=key, Metadata=meta
            )
            uid = mpu["UploadId"]
            parts: list[dict] = []
            pn = 1
            buf = bytearray()
            done = 0

            try:
                for chunk in resp.iter_bytes(65_536):
                    buf.extend(chunk)
                    sha.update(chunk)
                    if len(buf) >= PART_SIZE:
                        r = s3.upload_part(
                            Bucket=BUCKET,
                            Key=key,
                            UploadId=uid,
                            PartNumber=pn,
                            Body=bytes(buf),
                        )
                        parts.append({"PartNumber": pn, "ETag": r["ETag"]})
                        done += len(buf)
                        pn += 1
                        buf = bytearray()
                        _progress(done, total)

                if buf:
                    r = s3.upload_part(
                        Bucket=BUCKET,
                        Key=key,
                        UploadId=uid,
                        PartNumber=pn,
                        Body=bytes(buf),
                    )
                    parts.append({"PartNumber": pn, "ETag": r["ETag"]})
                    done += len(buf)

                digest = sha.hexdigest()
                if expected_sha256 and digest != expected_sha256:
                    s3.abort_multipart_upload(
                        Bucket=BUCKET, Key=key, UploadId=uid
                    )
                    print(
                        f"\n  HASH  CORRUPT download {key}  "
                        f"got={digest[:16]}… expected={expected_sha256[:16]}…"
                    )
                    return False

                if not expected_sha256:
                    meta["sha256"] = digest
                    # Re-set metadata on complete isn't possible;
                    # we copy-in-place after completion to attach it.

                s3.complete_multipart_upload(
                    Bucket=BUCKET,
                    Key=key,
                    UploadId=uid,
                    MultipartUpload={"Parts": parts},
                )

                # If we computed the hash (no expected), attach via copy
                if not expected_sha256:
                    try:
                        s3.copy_object(
                            Bucket=BUCKET,
                            Key=key,
                            CopySource={"Bucket": BUCKET, "Key": key},
                            Metadata=meta,
                            MetadataDirective="REPLACE",
                        )
                    except Exception:
                        pass  # Non-fatal: file uploaded, metadata missed

                print(
                    f"\r  OK    {_h(done):>10}  s3://{BUCKET}/{key}"
                    + f"  sha256={digest[:16]}…"
                    + " " * 20
                )
                return True

            except Exception:
                s3.abort_multipart_upload(
                    Bucket=BUCKET, Key=key, UploadId=uid
                )
                raise

    except Exception as exc:
        print(f"\n  FAIL  {exc}")
        return False


# ── S3 key mapping ───────────────────────────────────────────────────────────


def _hf_s3_key(repo_id: str, filepath: str, prefix: str | None) -> str:
    """Map an HF repo file to an S3 key.  Default: {org}/{repo}/{filepath}."""
    if prefix:
        return f"{prefix.rstrip('/')}/{filepath}"
    org, repo = repo_id.split("/", 1)
    return f"{org}/{repo}/{filepath}"


def _direct_s3_key(submodule: str, url: str, prefix: str | None) -> str:
    """Map a direct download URL to an S3 key."""
    parsed = _parse_hf_url(url)
    if parsed:
        repo_id, filepath = parsed
        return _hf_s3_key(repo_id, filepath, prefix)
    filename = url.rsplit("/", 1)[-1].split("?")[0]
    if prefix:
        return f"{prefix.rstrip('/')}/{filename}"
    return f"{submodule}/{filename}"


# ── YAML sidecar ─────────────────────────────────────────────────────────────


def _sidecar_yaml(
    key: str, repo_id: str | None = None, sha256: str | None = None
) -> str:
    """Generate a YAML sidecar matching the ggp-studio/models schema."""
    filename = key.rsplit("/", 1)[-1]
    name = (
        filename.rsplit(".", 1)[0]
        .replace("-", " ")
        .replace("_", " ")
        .title()
    )

    lower = key.lower()
    if "vae" in lower:
        model_type = "VAE"
    elif "lora" in lower:
        model_type = "LORA"
    elif "controlnet" in lower or "/control" in lower:
        model_type = "ControlNet"
    elif "text_encoder" in lower or "clip" in lower:
        model_type = "TextEncoder"
    elif "unet" in lower:
        model_type = "UNet"
    else:
        model_type = "Checkpoint"

    source_url = f"https://huggingface.co/{repo_id}" if repo_id else ""
    org = repo_id.split("/")[0] if repo_id else "Unknown"
    tag = model_type.lower().replace(" ", "")
    sha_line = f"  sha256: {sha256}\n" if sha256 else ""

    return (
        f"model_id: local:{key}\n"
        f"name: {name}\n"
        f"type: {model_type}\n"
        f"source: {'HuggingFace' if repo_id else 'Direct'}\n"
        f"author: {org}\n"
        f"description: File located at {key}\n"
        f"download_url: '{source_url}'\n"
        f"thumbnail_url: ''\n"
        f"tags:\n"
        f"- {tag}\n"
        f"files:\n"
        f"- file_name: {filename}\n"
        f"  download_url: '{source_url}'\n"
        f"  primary: true\n"
        f"  type: {model_type}\n"
        f"{sha_line}"
        f"updated_at: ''\n"
    )


def _upload_sidecar(
    s3, key: str, repo_id: str | None, dry_run: bool, sha256: str | None = None
) -> None:
    """Upload a .yaml sidecar for the given model S3 key."""
    sidecar_key = key + ".yaml"
    if dry_run:
        return
    if _s3_head(s3, sidecar_key) is not None:
        return
    body = _sidecar_yaml(key, repo_id, sha256=sha256)
    s3.put_object(Bucket=BUCKET, Key=sidecar_key, Body=body.encode())


# ── commands ─────────────────────────────────────────────────────────────────


def cmd_list(args) -> int:
    data = _load_links()
    if not data:
        return 1

    total_hf, total_direct, total_gd = 0, 0, 0

    for sub in sorted(data):
        d = data[sub]
        hf = d.get("huggingface", [])
        gd = d.get("google_drive", [])
        dr = d.get("direct", [])
        if args.submodule and sub != args.submodule:
            continue

        total_hf += len(hf)
        total_direct += len(dr)
        total_gd += len(gd)

        print(
            f"\n{sub}  ({len(hf)} HF repos, "
            f"{len(dr)} direct, {len(gd)} GDrive)"
        )
        for r in hf:
            print(f"    HF   {r}")
        for u in dr:
            print(f"    URL  {u}")
        for g in gd:
            print(f"    GD   {g}")

    if not args.submodule:
        print(
            f"\nTotals: {total_hf} HF repos, "
            f"{total_direct} direct URLs, {total_gd} GDrive links"
        )
    return 0


def cmd_inspect(args) -> int:
    from huggingface_hub import HfApi

    api = HfApi(token=os.getenv("HF_TOKEN"))
    repo_id = args.repo

    print(f"\nFetching file list for {repo_id} ...")
    try:
        items = list(api.list_repo_tree(repo_id, recursive=True))
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    files = []
    for f in items:
        if not hasattr(f, "rfilename"):
            continue
        sz = getattr(f, "size", 0) or 0
        ext = Path(f.rfilename).suffix.lower()
        files.append((f.rfilename, sz, ext in MODEL_EXTS))

    if args.filter:
        files = [
            (n, s, m) for n, s, m in files if fnmatch.fnmatch(n, args.filter)
        ]

    files.sort(key=lambda x: (-x[2], -x[1]))
    model_total = sum(s for _, s, m in files if m)
    all_total = sum(s for _, s, _ in files)

    print(
        f"{repo_id}: {len(files)} files, "
        f"model files {_h(model_total)}, total {_h(all_total)}\n"
    )
    for name, size, is_model in files:
        tag = "*" if is_model else " "
        print(f"  {tag} {_h(size):>10}  {name}")
    return 0


def cmd_download(args) -> int:
    data = _load_links()
    if not data:
        return 1

    s3 = None
    if not args.dry_run:
        s3 = _s3_client()
        if s3 is None:
            return 1

    ok = 0
    fail = 0

    do_verify = getattr(args, "verify", False)

    # ── single URL mode ──────────────────────────────────────
    if args.url:
        url = args.url.replace("/blob/main/", "/resolve/main/")
        key = args.key or _direct_s3_key("manual", url, args.prefix)
        if _stream_to_s3(
            s3, url, key, dry_run=args.dry_run, verify=do_verify
        ):
            ok += 1
            if args.sidecar:
                parsed = _parse_hf_url(url)
                _upload_sidecar(
                    s3, key, parsed[0] if parsed else None, args.dry_run
                )
        else:
            fail += 1
        print(f"\nDone: {ok} ok, {fail} failed")
        return 0 if fail == 0 else 1

    # ── determine target submodules ──────────────────────────
    targets: dict[str, dict] = {}
    if args.repo:
        for sub, d in data.items():
            if args.repo in d.get("huggingface", []):
                targets[sub] = d
                break
        if not targets:
            targets["_direct"] = {
                "huggingface": [args.repo],
                "direct": [],
                "google_drive": [],
            }
    elif args.submodule:
        if args.submodule in data:
            targets[args.submodule] = data[args.submodule]
        else:
            print(
                f"ERROR: submodule '{args.submodule}' not in scan data.",
                file=sys.stderr,
            )
            return 1
    elif args.all:
        if not args.dry_run and not args.yes:
            print(
                f"This will download models from ALL {len(data)} submodules.\n"
                "WARNING: This could be hundreds of terabytes of data!\n"
                "Re-run with --dry-run to preview first."
            )
            if not sys.stdin.isatty():
                print(
                    "ERROR: stdin is not a terminal. "
                    "Use --yes to skip confirmation.",
                    file=sys.stderr,
                )
                return 1
            try:
                resp = input("Type 'yes' to continue: ")
            except EOFError:
                return 1
            if resp.strip().lower() != "yes":
                return 0
        targets = data
    else:
        print(
            "ERROR: specify --repo, --submodule, --url, or --all.",
            file=sys.stderr,
        )
        return 1

    from huggingface_hub import HfApi, hf_hub_url

    api = HfApi(token=os.getenv("HF_TOKEN"))

    for sub, d in sorted(targets.items()):
        print(f"\n{'=' * 60}\n{sub}\n{'=' * 60}")

        # ── HuggingFace repos ────────────────────────────────
        for repo_id in d.get("huggingface", []):
            if args.repo and repo_id != args.repo:
                continue
            print(f"\n  HF repo: {repo_id}")
            try:
                items = list(api.list_repo_tree(repo_id, recursive=True))
            except Exception as exc:
                print(f"    ERROR listing: {exc}")
                fail += 1
                continue

            for f in items:
                if not hasattr(f, "rfilename"):
                    continue
                ext = Path(f.rfilename).suffix.lower()
                if not args.full_repo and ext not in MODEL_EXTS:
                    continue
                # Extract SHA256 from HuggingFace LFS metadata
                file_sha = None
                lfs = getattr(f, "lfs", None)
                if lfs:
                    file_sha = getattr(lfs, "sha256", None)
                url = hf_hub_url(repo_id, f.rfilename)
                key = _hf_s3_key(repo_id, f.rfilename, args.prefix)
                if _stream_to_s3(
                    s3,
                    url,
                    key,
                    dry_run=args.dry_run,
                    expected_sha256=file_sha,
                    verify=do_verify,
                ):
                    ok += 1
                    if args.sidecar and ext in MODEL_EXTS:
                        _upload_sidecar(
                            s3, key, repo_id, args.dry_run, sha256=file_sha
                        )
                else:
                    fail += 1

        # ── direct URLs ──────────────────────────────────────
        for url in d.get("direct", []):
            url = url.replace("/blob/main/", "/resolve/main/")
            key = _direct_s3_key(sub, url, args.prefix)
            parsed = _parse_hf_url(url)
            if _stream_to_s3(
                s3, url, key, dry_run=args.dry_run, verify=do_verify
            ):
                ok += 1
                if args.sidecar:
                    _upload_sidecar(
                        s3,
                        key,
                        parsed[0] if parsed else None,
                        args.dry_run,
                    )
            else:
                fail += 1

        # ── Google Drive (manual) ────────────────────────────
        for g in d.get("google_drive", []):
            print(f"  SKIP  Google Drive (manual download required): {g}")

    print(f"\nDone: {ok} ok, {fail} failed")
    return 0 if fail == 0 else 1


# ── CLI ──────────────────────────────────────────────────────────────────────


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Stream model files to s3://ggp-models",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  python load-models.py list\n"
            "  python load-models.py inspect Lightricks/LTX-2\n"
            "  python load-models.py download --repo Lightricks/LTX-2 --dry-run\n"
            "  python load-models.py download --submodule DreamID-V --sidecar\n"
            "  python load-models.py download --all --dry-run\n"
        ),
    )
    sub = ap.add_subparsers(dest="command")

    # list
    p_ls = sub.add_parser("list", help="Show discovered model sources")
    p_ls.add_argument("--submodule", help="Filter to one submodule")

    # inspect
    p_in = sub.add_parser("inspect", help="List files in a HuggingFace repo")
    p_in.add_argument("repo", help="HF repo id (org/name)")
    p_in.add_argument("--filter", help="Glob pattern for filenames")

    # download
    p_dl = sub.add_parser("download", help="Download and stream to S3")
    g = p_dl.add_mutually_exclusive_group()
    g.add_argument("--repo", help="Single HF repo id (org/name)")
    g.add_argument("--submodule", help="All repos for a submodule")
    g.add_argument("--url", help="Single direct download URL")
    g.add_argument("--all", action="store_true", help="All submodules")
    p_dl.add_argument("--key", help="Explicit S3 key (with --url)")
    p_dl.add_argument("--prefix", help="Override S3 key prefix")
    p_dl.add_argument(
        "--full-repo",
        action="store_true",
        help="Download all files, not just model weights",
    )
    p_dl.add_argument(
        "--sidecar",
        action="store_true",
        help="Generate .yaml sidecar metadata for each model",
    )
    p_dl.add_argument(
        "--verify",
        action="store_true",
        help="Verify existing S3 files against expected SHA256; re-upload on mismatch",
    )
    p_dl.add_argument(
        "--yes", "-y", action="store_true", help="Skip confirmation prompt (for --all)"
    )
    p_dl.add_argument(
        "--dry-run", action="store_true", help="Preview without downloading"
    )

    args = ap.parse_args()
    if not args.command:
        ap.print_help()
        return 0

    if args.command == "list":
        return cmd_list(args)
    if args.command == "inspect":
        return cmd_inspect(args)
    if args.command == "download":
        return cmd_download(args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
