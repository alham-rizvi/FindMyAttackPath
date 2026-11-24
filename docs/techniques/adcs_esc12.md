---
id: adcs_esc12
type: technique
label: "AD CS ESC12 (CA signing-key exposure)"
phase: "persist"
tools: ["certipy", "forgecert"]
cve: null
detect: "Monitor CA host integrity and private-key access/export, plus trusted certificates not represented in normal CA request records."
mitre: "T1649"
tag: null
---

# AD CS ESC12 (CA signing-key exposure)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**CA server host** + **`EDITF_ATTRIBUTESUBJECTALTNAME2`**.

## Detection
CertSvc config registry writes; CA key export audit (`certutil -backup`).

---

## References

- [Microsoft: Active Directory Certificate Services overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
