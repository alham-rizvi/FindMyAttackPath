---
id: session_recon
type: technique
label: "Session & share reconnaissance"
phase: "recon"
tools: ["sauroneye", "snaffler", "netexec"]
cve: null
detect: "NetSessionEnum calls; 5140/5145 share-access events."
mitre: "T1135 / T1049"
tag: null
---

# Session & share reconnaissance

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Logon sessions** on hosts.

## Detection
**4624 type 3** enumeration; SAMR/LSA queries; restrict local admin footprint.

---

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1135](https://attack.mitre.org/techniques/T1135/)
- [MITRE ATT&CK: T1049](https://attack.mitre.org/techniques/T1049/)
