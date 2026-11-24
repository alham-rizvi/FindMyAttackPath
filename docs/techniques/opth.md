---
id: opth
type: technique
label: "Overpass-the-hash"
phase: "lateral"
tools: ["rubeus", "mimikatz"]
cve: null
detect: "4768 issued immediately from a non-interactive context."
mitre: "T1550.003"
tag: null
---
Convert a stolen NTLM hash into a full Kerberos TGT, moving an NTLM-only foothold onto the Kerberos path.

## Prerequisite
An NTLM hash or AES key.
