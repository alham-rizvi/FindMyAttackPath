# Contributing to Find My Attack Path

Every node on the graph (phase, technique, tool, CVE) is just a markdown file under `docs/`.
You do not need to touch `index.html` to add or update an attack vector — you edit or add a
markdown file, list it in `docs/manifest.json`, and open a pull request. The site fetches these
files at page load, so once a PR is merged the graph updates automatically.

## Folder layout

```
docs/
  phases/        one file per kill-chain phase (recon, initial, cred, privesc, lateral, persist, hybrid)
  techniques/     one file per attack technique
  tools/          one file per tool/repo referenced by a technique
  cves/           one file per CVE-backed technique
  manifest.json   the index the site reads on load — every file above must be listed here
```

## File format

Each file is YAML frontmatter + a markdown body. The frontmatter is the structured data the
graph needs (ids, links between nodes); the body is free-form markdown shown in the detail
panel when someone clicks the node.

### Technique

```markdown
---
id: my_new_technique
type: technique
label: "Short display name"
phase: privesc              # must match a phase id in docs/phases/
tools: ["certipy", "rubeus"] # ids of files in docs/tools/ — leave [] if none yet
cve: null                    # or an id from docs/cves/
detect: "What a blue team would actually see in logs."
mitre: "T1649"
tag: null                    # set to "new" to get the amber ring for recently-disclosed techniques
---
One or two sentences on what the technique does.

## Prerequisite
What an attacker needs in hand before this works (a credential, a right, network access).

You can add more sections (## Detection detail, ## References, etc.) — anything past the
first paragraph and the Prerequisite heading is just rendered as-is.

### Diagrams

You can embed a Mermaid diagram anywhere in the body:

    ```mermaid
    graph LR
      A[Foothold] --> B[Coerce auth] --> C[Relay to ADCS]
    ```

The site renders fenced ```mermaid blocks automatically — no need to generate an image.
Rendered diagrams include controls to open a large viewer and download either SVG or
Mermaid source (.mmd).
```

### Tool

```markdown
---
id: my_tool
type: tool
label: "repo-display-name"
repo: "org/repo-name"        # used to build the GitHub link
category: "Credential Access"
---
One sentence on what the tool does.
```

### CVE

```markdown
---
id: cve-2027-xxxxx
type: cve
label: "Catchy Name"
year: 2027
source: "https://link-to-advisory-or-nvd"
---
What the flaw is and what it lets an attacker do.
```

### Phase

New phases are rare (they form the main left-to-right chain), but the format is:

```markdown
---
id: new_phase
type: phase
label: "Phase Name"
---
What happens during this phase.
```

If you add a phase, also add its id to the `phase` field of any technique that belongs to it.

## Adding a new node — step by step

1. Fork the repo.
2. Add your markdown file under the right `docs/<type>/` folder, named `<id>.md`.
3. Add an entry to `docs/manifest.json`:
   ```json
   { "id": "my_new_technique", "type": "technique", "path": "docs/techniques/my_new_technique.md" }
   ```
4. If your technique references a tool or CVE that doesn't exist yet, add those files too
   (same steps, different folder) and list them in the manifest as well.
5. Open the PR. Describe the technique, link any public write-up or PoC you based it on, and
   say whether it's been tested in a lab.
6. I'll review it like any other PR — if it looks right, I merge it and your change ships on
   the live graph, wires and all, with no other build step needed.

## Updating an existing node

Edit the markdown file directly and open a PR with the diff. No manifest change needed unless
you're renaming or moving the file.

## House rules

- Keep descriptions factual and defensive-aware: every technique should have a `detect` line
  that's actually useful to a blue team, not just an attacker.
- Link to a real source (advisory, blog post, repo) in the body or in `source`/`repo` wherever
  you can — unverifiable "new since 2025" claims get re-checked before merge.
- This project is for authorized testing and study (OSCP/CRTO-style prep). Don't add anything
  that's only useful against systems you don't have permission to test.
