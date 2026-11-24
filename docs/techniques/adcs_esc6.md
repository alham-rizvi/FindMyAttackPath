---
id: adcs_esc6
type: technique
label: "AD CS ESC6 (CA-wide SAN policy)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review CA policy flags and correlate certificate requests with subject/SAN values that differ from directory-derived identity."
mitre: "T1649"
tag: null
---


# AD CS ESC6 (CA-wide SAN policy)

### Affected object / attribute
**CA registry flag `EDITF_ATTRIBUTESUBJECTALTNAME2`**.

### Concept (deep)
The flag makes **every template** accept a CSR-supplied SAN → any Client Auth template becomes ESC1-equivalent.

### Commands
```bash
