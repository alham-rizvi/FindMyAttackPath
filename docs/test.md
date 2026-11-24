# test

Smoke-test page: verifies the docs renderer parses `mermaid` blocks and relative links. Keep one trivial technique stub so CI can assert the manifest resolves every path.

---

# Bundling into the 138-file tree

```bash
mkdir -p docs/{cves,phases,techniques,tools}
# Save each "## `docs/...`" section above into its matching .md file.
zip -r docs_full.zip docs/
```

**Consistency checklist before the PR:**
- [ ] `manifest.json` counts match (5/7/69/55/2 = 138)
- [ ] every path in the tree has a matching `.md`
- [ ] `index.html` fallback regenerated from `manifest.json`
- [ ] new files `adcs_esc17.md` and `sites_acl_abuse.md` present (open PR scope)
- [ ] all relative links resolve
- [ ] no exploit text in `cve-2026-*` stubs until advisories publish
- [ ] state-changing techniques (Zerologon restore, ESC4/7, DCShadow, AdminSDHolder, SID History) clearly marked with **snapshot/restore** instructions

**Handling the open PR:** edit `techniques/adcs_esc17.md`, `techniques/sites_acl_abuse.md`, and `manifest.json` on the PR branch (or coordinate) to avoid conflicting overwrites.
