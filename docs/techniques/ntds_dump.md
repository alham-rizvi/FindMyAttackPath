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
Dump the full AD database, yielding every domain account's password hash in one pull.

## Prerequisite
Domain controller access, or DCSync-equivalent rights.

## How it works

The domain controller database, NTDS.dit, contains directory data including password-derived secrets. An attacker who can access the database or obtain equivalent replication data can expose credentials for many domain identities at once. The distinction between copying the database and requesting replication data matters for both telemetry and containment.

## Defensive checks

Protect domain controllers, system-state backups, and replication permissions as Tier-0 assets. Alert on unexpected volume-shadow-copy activity, access to the database and its supporting files, and replication requests from non-DC systems. After confirmed exposure, plan domain-wide credential and key rotation with forest-recovery guidance.

## References

- [MITRE ATT&CK: NTDS](https://attack.mitre.org/techniques/T1003/003/)
- [Microsoft: AD forest recovery guide](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-guide)
