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
