---
id: adcs_esc7
type: technique
label: "AD CS ESC7 (CA management rights)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review CA Manage CA/Manage Certificates assignments and audit administrative, approval and issuance-state changes."
mitre: "T1649"
tag: null
---


# AD CS ESC7 (CA management rights)

### Affected object / attribute
**CA object roles** — **Manage CA** / **Manage Certificates**.

### Concept (deep)
A low-priv principal holds a CA management role → approve own pending requests or issue arbitrary certificates. With **Manage CA**, enable the ESC6 flag and chain.

### Commands
```bash
