---
id: adcs_esc9
type: technique
label: "AD CS ESC9 (missing security extension)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review template security-extension flags, certificate contents and domain-controller certificate mapping policy."
mitre: "T1649"
tag: null
---

# AD CS ESC9 (missing security extension)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Template flag `CT_FLAG_NO_SECURITY_EXTENSION`** and **weak `szOID_NTDS_CA_SECURITY_EXT` mapping**.

## Detection
**UPN changes** followed by cert enrolment (**5136 + 4886**); enforce SID binding.

---

## References

- [Microsoft: KB5014754 certificate-based authentication changes](https://support.microsoft.com/kb/5014754)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
