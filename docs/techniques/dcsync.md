---
id: dcsync
type: technique
label: "DCSync"
phase: "persist"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4662 with the replication-GUID access mask, from a non-DC source."
mitre: "T1003.006"
tag: null
---
Abuse directory-replication rights (MS-DRSR) to pull password hashes for any account — krbtgt included — straight from a DC.

## Prerequisite
Replicating Directory Changes (+ All) rights.

## How it works

Active Directory replication uses the Directory Replication Service Remote Protocol (DRSUAPI) between domain controllers. An identity granted replication rights can request directory data through that protocol, including password-derived values, without copying the database file directly. This is a highly sensitive permission and should normally be limited to domain controllers and explicitly approved synchronization services.

## Defensive checks

Audit replication-related extended rights on the domain root, alert when replication requests originate from non-DC systems or unexpected identities, and review changes to those rights. If exposure is confirmed, preserve evidence and follow forest-recovery guidance because domain-wide secrets may be affected.

## References

- [MITRE ATT&CK: DCSync](https://attack.mitre.org/techniques/T1003/006/)
- [Microsoft Open Specifications: Directory Replication Service Remote Protocol](https://learn.microsoft.com/openspecs/windows_protocols/ms-drsr/)
- [Microsoft: AD forest recovery guide](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-guide)
