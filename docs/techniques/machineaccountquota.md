---
id: machineaccountquota
type: technique
label: "MachineAccountQuota abuse"
phase: "privesc"
tools: ["powermad", "impacket"]
cve: null
detect: "Unusual volume of computer-object creation from one user."
mitre: "T1136.002"
tag: null
---
Use the default right every domain user has to create computer accounts, producing a controlled machine identity for delegation or noPac-style attacks.

## Prerequisite
Default MachineAccountQuota (10) still in effect.
