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


# MachineAccountQuota abuse

### Affected object / attribute
**`ms-DS-MachineAccountQuota`** on the domain object (default **10**).

### Concept (deep)
Any authenticated user can create machine accounts — the prerequisite for **RBCD**, **Shadow Credentials**, **noPac**.

### Commands
```bash
