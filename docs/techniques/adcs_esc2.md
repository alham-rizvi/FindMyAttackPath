---
id: adcs_esc2
type: technique
label: "AD CS ESC2 (broad certificate purpose)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review template EKU/application-policy settings and correlate issuance with certificate authentication or other unexpected use."
mitre: "T1649"
tag: null
---


# AD CS ESC2 (broad certificate purpose)

### Affected object / attribute
**Certificate template** with **Any Purpose EKU** (`2.5.29.37.0`) or no EKU.

### Concept (deep)
The **Any Purpose EKU** satisfies any service authentication requirement. It is effectively equivalent to ESC1 for impersonation but does **not** require the Client Authentication EKU specifically. The attacker requests a certificate with an arbitrary SAN and authenticates as the target.

### Commands
```bash
