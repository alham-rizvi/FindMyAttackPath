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
Grant membership in a privileged group across a trust by writing to an account's SID history.

## Prerequisite
SeEnableDelegationPrivilege or Domain Admin-equivalent rights.

## How it works

The SIDHistory attribute can preserve a user's prior security identifiers during an authorized domain migration. If an attacker can add a privileged SID to an account and a resource accepts that SID across the relevant trust, the account may gain access associated with the historical identity. Impact depends on domain privileges, trust filtering, and resource authorization.

## Defensive checks

Restrict who can modify SIDHistory, monitor additions and changes, and use SID filtering on trusts where appropriate. Investigate unexpected privileged SIDs in access tokens and correlate changes with approved migration records; do not disable legitimate migration controls without validating their dependencies.

## References

- [MITRE ATT&CK: Access Token Manipulation: SID-History Injection](https://attack.mitre.org/techniques/T1134/005/)
- [Microsoft: SID filtering](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-identifiers)
