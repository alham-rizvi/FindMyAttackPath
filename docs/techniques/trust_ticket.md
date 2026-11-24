---
id: trust_ticket
type: technique
label: "Inter-forest trust-ticket abuse"
phase: "hybrid"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4769 for a cross-realm TGS."
mitre: "T1482 / T1558"
tag: null
---
Forge an inter-realm TGT using a trust key to reach resources in a trusting forest.

## Prerequisite
The trust account's NTLM hash.
