---
id: dcshadow
type: technique
label: "DCShadow"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "Unexpected new DC registration; replication from an unrecognized server."
mitre: "T1207"
tag: null
---

# DCShadow

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Rogue DC registration** in the **Configuration partition**; pushes changes to **any AD object** via replication.

## Detection
**4742/5136** changes with a replication source not in the DC list; **4928/4929** replication partner anomalies; **DRSUAPI from a non-DC**.

---

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1207](https://attack.mitre.org/techniques/T1207/)
