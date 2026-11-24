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

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**CA object roles** — **Manage CA** / **Manage Certificates**.

## Detection
**4887** (cert issued) by a non-CA-officer; CA role changes. `Manage CA` should be **EA-only**.

---

## References

- [Microsoft: Active Directory Certificate Services overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
