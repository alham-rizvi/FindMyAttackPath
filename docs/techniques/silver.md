---
id: silver
type: technique
label: "Silver ticket"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "A 4769 for that service with no prior 4768."
mitre: "T1558.002"
tag: null
---
Forge a TGS for one specific service using that service account's own hash, bypassing the DC entirely for that ticket.

## Prerequisite
A service account's NTLM hash.
