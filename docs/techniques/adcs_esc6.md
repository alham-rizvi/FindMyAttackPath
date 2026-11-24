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

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**CA registry flag `EDITF_ATTRIBUTESUBJECTALTNAME2`**.

## Detection
CA registry change (**4657**) + restart of `CertSvc`; **4886** SAN mismatch.

---

## References

- [Microsoft: Active Directory Certificate Services overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
