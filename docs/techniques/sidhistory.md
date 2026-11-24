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
