---
id: ptt
type: technique
label: "Pass-the-ticket"
phase: "lateral"
tools: ["rubeus", "mimikatz"]
cve: null
detect: "A 4769 with no preceding 4768 from that host."
mitre: "T1550.003"
tag: null
---
Inject a stolen Kerberos ticket into the current session to access remote services as its owner.

## Prerequisite
A captured TGT or TGS.
