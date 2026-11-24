---
id: sidhistory
type: technique
label: "SID history injection"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "4765/4766 SID-history change events."
mitre: "T1134.005"
tag: null
---

# SID history injection

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`sIDHistory`** on a user or computer.

## Detection
**5136** on `sIDHistory`; **4765/4766**; alert on any `sIDHistory` write.

---

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1134.005](https://attack.mitre.org/techniques/T1134/005/)
