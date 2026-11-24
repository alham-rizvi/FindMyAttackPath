---
id: golden
type: technique
label: "Golden ticket"
phase: "persist"
tools: ["mimikatz", "rubeus"]
cve: null
detect: "A 4769 with no matching 4768; a TGT lifetime outside domain policy."
mitre: "T1558.001"
tag: null
---
Forge a TGT for any user using the domain's krbtgt hash, valid until krbtgt is rotated twice.

## Prerequisite
The krbtgt account's hash, via DCSync or an NTDS dump.
