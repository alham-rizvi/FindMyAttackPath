---
id: adcs_esc1
type: technique
label: "ADCS ESC1"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Certificate issuance (4886/4887) for an unexpected UPN."
mitre: "T1649"
tag: null
---
A template lets the enrollee set an arbitrary SAN with client-auth EKU, so you request a certificate as any user — Domain Admin included.

## Prerequisite
Enrollment rights on a vulnerable template.
