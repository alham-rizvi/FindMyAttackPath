---
id: constrained_deleg
type: technique
label: "Constrained delegation abuse (S4U2Self/S4U2Proxy)"
phase: "privesc"
tools: ["rubeus", "impacket"]
cve: null
detect: "4769 showing S4U flags set."
mitre: "T1558"
tag: null
---
Use an account's allowed delegation to impersonate any user to one specific service.

## Prerequisite
Control of an account with constrained delegation configured.
