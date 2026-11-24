---
id: bloodhound_collect
type: technique
label: "BloodHound graph collection"
phase: "recon"
tools: ["bloodhound", "sharphound", "bloodhoundpy", "rusthound", "netexec", "goodhound", "improhound"]
cve: null
detect: "Collector execution; large LDAP/SMB session bursts; ZIP creation."
mitre: "T1087 / T1482"
tag: null
---

# BloodHound graph collection

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Graph of users, computers, groups, GPOs, trusts, ACLs, ADCS, sessions, containers**.

## Impact
**Ranked attack paths** to DA/DCSync/ADCS.

## Detection
LDAP query bursts, SAMR enumeration, SharpHound/bloodhound-python user agents.

---

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1087](https://attack.mitre.org/techniques/T1087/)
- [MITRE ATT&CK: T1482](https://attack.mitre.org/techniques/T1482/)
