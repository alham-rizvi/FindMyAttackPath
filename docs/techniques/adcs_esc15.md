---
id: adcs_esc15
type: technique
label: "AD CS ESC15 (legacy template application policy)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Inventory schema-version-1 templates and compare issued application-policy extensions with the template's intended purpose."
mitre: "T1649"
tag: null
---


# AD CS ESC15 (legacy template application policy)

### Affected object / attribute
**`msPKI-Template-Schema-Version = 1`** templates + low-priv enrolment on unpatched CAs.

### Concept (deep)
**Schema version 1** templates allow **EKU manipulation** in the CSR (“EKUwu”) → add Client Auth/Any Purpose to a template that should not have it.

### Commands
```bash
