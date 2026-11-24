---
id: dmsa_ouroboros
type: technique
label: "dMSA Ouroboros credential extraction"
phase: "cred"
tools: []
cve: null
detect: "Directory-service access to dMSA attributes."
mitre: "T1003 (variant)"
tag: "new"
---

# dMSA Ouroboros credential extraction

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**dMSA object** (`msDS-ManagedPassword`, key material) — Server 2025.

## Detection
**5136** on dMSA objects modifying key material; dMSA created by non-tier-0 principals.

---

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1003](https://attack.mitre.org/techniques/T1003/)
