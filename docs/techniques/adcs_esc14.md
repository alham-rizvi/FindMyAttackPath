---
id: adcs_esc14
type: technique
label: "AD CS ESC14 (explicit certificate mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Audit altSecurityIdentities changes and correlate explicit mappings with certificate-based authentication."
mitre: "T1649"
tag: null
---


# AD CS ESC14 (explicit certificate mapping)

### Affected object / attribute
**Template ACEs** — `WriteProperty` on `msPKI-Certificate-Name-Flag`.

### Concept (deep)
Weak ACE patterns let an attacker **flip SAN supply** → chain into ESC1. Same **modify → exploit → restore** discipline.

### Commands
```bash
