---
id: ntds_dump
type: technique
label: "NTDS.dit extraction"
phase: "cred"
tools: ["impacket", "certsync"]
cve: null
detect: "4662 on the NTDS object; VSS shadow-copy events on a DC."
mitre: "T1003.003"
tag: null
---

# NTDS.dit extraction

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`NTDS.dit`** on a DC.

## Detection
VSS creation (**8222**), `ntdsutil` execution (**4688**), **4662** mass reads; Tier-0 DC access control.

---

## References

- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1003.003](https://attack.mitre.org/techniques/T1003/003/)
