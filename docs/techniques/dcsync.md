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
