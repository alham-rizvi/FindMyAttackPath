---
id: rdp_lateral
type: technique
label: "RDP lateral movement & session hijacking"
phase: "lateral"
tools: []
cve: null
detect: "4624 type 10; tscon.exe invocation."
mitre: "T1021.001 / T1563.002"
tag: null
---

# RDP lateral movement & session hijacking

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**RDP logon** on the target.

## Detection
**4624 type 10**; **1149** (RDP auth); source IP baseline; disable Restricted Admin unless required; NLA + MFA.

---

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1021.001](https://attack.mitre.org/techniques/T1021/001/)
- [MITRE ATT&CK: T1563.002](https://attack.mitre.org/techniques/T1563/002/)
