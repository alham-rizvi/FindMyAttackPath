---
id: adcs_esc13
type: technique
label: "AD CS ESC13 (issuance-policy group mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review issuance-policy OID mappings and correlate issued policies with certificate-authentication and authorization decisions."
mitre: "T1649"
tag: null
---


# AD CS ESC13 (issuance-policy group mapping)

### Affected object / attribute
**`msDS-OIDToGroupLink`** linking an issuance policy OID to a privileged group.

### Concept (deep)
A certificate from the linked template grants the **group’s privileges in the token**.

### Commands
```bash
