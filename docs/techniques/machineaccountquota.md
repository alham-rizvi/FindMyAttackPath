---
id: machineaccountquota
type: technique
label: "MachineAccountQuota abuse"
phase: "privesc"
tools: ["powermad", "impacket"]
cve: null
detect: "Unusual volume of computer-object creation from one user."
mitre: "T1136.002"
tag: null
---

# MachineAccountQuota abuse

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`ms-DS-MachineAccountQuota`** on the domain object (default **10**).

## Detection and defensive measures
**4741** machine account creation by non-machine principals; set MAQ to **0** and delegate creation to a tier-0 group.

---

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1136.002](https://attack.mitre.org/techniques/T1136/002/)
