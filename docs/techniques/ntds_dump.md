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


# NTDS.dit extraction

### Affected object / attribute
**`NTDS.dit`** on a DC.

### Concept (deep)
`NTDS.dit` contains every domain hash. Extract via VSS/`ntdsutil` on a DC, or remotely via `secretsdump` (DRSUAPI/VSS).

### Commands
```bash
