---
id: sam_lsa
type: technique
label: "SAM / LSA secrets dump"
phase: "cred"
tools: ["impacket"]
cve: null
detect: "Registry hive save/read events; VSS shadow-copy creation."
mitre: "T1003.002"
tag: null
---
Extract local account hashes and cached domain credentials from the registry hives.

## Prerequisite
Local admin.

## How it works

The Security Account Manager (SAM) stores local account credential data, while LSA secrets can contain service credentials and other protected material. Administrative access or access to a suitable backup may expose these stores for offline analysis. Recovered local credentials can create risk on other machines if password reuse or weak local-account management is present.

## Defensive checks

Deploy Windows LAPS with unique, rotated local administrator passwords, restrict backup and registry-hive access, and alert on unexpected hive exports or shadow-copy activity. Investigate whether any recovered secret was reused and rotate affected credentials across dependent services and hosts.

## References

- [MITRE ATT&CK: Security Account Manager](https://attack.mitre.org/techniques/T1003/002/)
- [Microsoft: Windows LAPS overview](https://learn.microsoft.com/windows-server/identity/laps/laps-overview)
