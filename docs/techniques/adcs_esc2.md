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

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Certificate template** with **Any Purpose EKU** (`2.5.29.37.0`) or no EKU.

## Impact / detection
Same as ESC1. **Flag templates with Any Purpose EKU** and remove the EKU or restrict enrolment.

---

## References

- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
