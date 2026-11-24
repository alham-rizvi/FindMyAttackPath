---
id: rbcd
type: technique
label: "Resource-Based Constrained Delegation (RBCD)"
phase: "privesc"
tools: ["impacket", "rubeus", "rbcdpy", "powermad"]
cve: null
detect: "Attribute write on msDS-AllowedToActOnBehalfOfOtherIdentity."
mitre: "T1558"
tag: "new"
---
Write delegation rights onto a computer object you control, then impersonate any user through it.

## Prerequisite
Write access to msDS-AllowedToActOnBehalfOfOtherIdentity on a target computer.
