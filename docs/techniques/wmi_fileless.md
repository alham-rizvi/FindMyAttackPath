---
id: wmi_fileless
type: technique
label: "Fileless WMI event-subscription execution"
phase: "lateral"
tools: []
cve: null
detect: "WMI permanent-subscription creation events."
mitre: "T1546.003"
tag: null
---
Execute code through a WMI permanent event subscription, without dropping a payload to disk.

## Prerequisite
WMI write access on the target.
