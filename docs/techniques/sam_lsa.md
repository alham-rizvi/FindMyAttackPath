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
