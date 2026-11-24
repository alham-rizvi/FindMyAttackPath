#!/usr/bin/env python3
"""
Refreshes the <script id="embedded-docs"> snapshot inside index.html from the
current contents of docs/. Run this after editing/adding files under docs/ if
you need index.html to keep working as a single-file deploy (some hosts only
take one file, or you just want a safety net if docs/ ever 404s).

Usage:  python3 scripts/embed-docs.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
MANIFEST = ROOT / "docs" / "manifest.json"


def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    files = {}
    for entry in manifest:
        path = ROOT / entry["path"]
        files[entry["path"]] = path.read_text(encoding="utf-8")

    blob = json.dumps({"manifest": manifest, "files": files}, ensure_ascii=False)
    # guard against a stray "</script" in any doc body prematurely closing the tag
    blob = blob.replace("</script", "<\\/script").replace("</Script", "<\\/Script")

    html = INDEX.read_text(encoding="utf-8")
    new_tag = f'<script type="application/json" id="embedded-docs">{blob}</script>'
    pattern = re.compile(
        r'<script type="application/json" id="embedded-docs">[\s\S]*?</script>'
    )
    if not pattern.search(html):
        raise SystemExit(
            "Couldn't find the existing #embedded-docs <script> tag in index.html — "
            "has it been removed or renamed?"
        )
    # NOTE: pass a function, not the string directly — re.sub() treats backslash
    # sequences in a *string* replacement specially (\n, \1, etc.), which would
    # mangle the escaped newlines inside our JSON blob.
    html = pattern.sub(lambda _m: new_tag, html, count=1)
    INDEX.write_text(html, encoding="utf-8")
    print(f"Embedded {len(manifest)} docs/ files into index.html ({len(blob):,} bytes).")


if __name__ == "__main__":
    main()
