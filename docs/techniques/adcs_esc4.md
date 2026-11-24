---
id: adcs_esc4
type: technique
label: "AD CS ESC4 (template ACL control)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Audit certificate-template owner, DACL, inherited rights and changes to security-sensitive template attributes."
mitre: "T1649"
tag: null
---

# AD CS ESC4 (template ACL control)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Certificate template object** — `nTSecurityDescriptor` (WriteOwner / WriteDacl / GenericAll).

## Detection
**5136** on `pKICertificateTemplate`; monitor template ACL changes and `msPKI-*` attribute edits.

---

## References

- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
