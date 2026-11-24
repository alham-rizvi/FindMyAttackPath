## What does this add or change?

<!-- A technique, tool, CVE or phase — name it and link any public write-up/PoC it's based on. -->

## Checklist

- [ ] New/edited file lives under the right `docs/<type>/` folder, named `<id>.md`
- [ ] Frontmatter follows the format in [CONTRIBUTING.md](../CONTRIBUTING.md) (correct `type`,
      and `phase`/`tools`/`cve` ids actually exist elsewhere in `docs/`)
- [ ] New file is listed in `docs/manifest.json`
- [ ] Technique entries include a real `detect` line (what a blue team would see)
- [ ] Tested locally with `python3 -m http.server` — node renders, detail panel looks right,
      any Mermaid diagram in the body renders
- [ ] If this should also land in the single-file fallback, ran `python3 scripts/embed-docs.py`
      and committed the updated `index.html`

## Source / verification

<!-- Link an advisory, blog post, repo, or say it's from your own lab testing. -->
