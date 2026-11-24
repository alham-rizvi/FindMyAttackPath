---
id: skeleton_key
type: technique
label: "Skeleton key"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "LSASS memory modification on a DC — rare, very high-signal."
mitre: "T1556.001"
tag: null
---
Patch a live domain controller's LSASS so one master password authenticates as any domain account, alongside each account's real password.

## Prerequisite
Local admin on a domain controller.
