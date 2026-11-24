---
id: adcs_esc16
type: technique
label: "AD CS ESC16 (CA security-extension suppression)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review CA extension-suppression policy and inspect issued certificates for the expected security extension."
mitre: "T1649"
tag: null
---


# AD CS ESC16 (CA security-extension suppression)

### Affected object / attribute
**CA-wide `DisableExtensionList`** including the **SID security extension** (`1.3.6.1.4.1.311.25.2`).

### Concept (deep)
The SID is omitted from **all** certificates. Combine with **ESC6 URL-SAN** to bypass enforcement. **CA-level**, not template-level.

### Commands
```bash
