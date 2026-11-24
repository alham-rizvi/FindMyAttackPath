---
id: diamond
type: technique
label: "Diamond ticket"
phase: "persist"
tools: ["rubeus"]
cve: null
detect: "Subtle, hard-to-spot field inconsistencies on an otherwise valid TGT."
mitre: "T1558.001"
tag: "new"
---
Modify the fields of a legitimately-issued TGT in place rather than forging one from scratch, evading golden-ticket anomaly detection.

## Prerequisite
The krbtgt hash plus a genuine TGT to modify.
