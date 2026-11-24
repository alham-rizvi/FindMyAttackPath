---
id: ticket_dump
type: technique
label: "Kerberos ticket extraction"
phase: "cred"
tools: ["rubeus", "mimikatz", "kekeo"]
cve: null
detect: "LSA cache access; unusual 4769 patterns."
mitre: "T1558"
tag: null
---
Harvest cached TGT/TGS tickets from the LSA cache for reuse elsewhere.

## Prerequisite
Local admin, or the owning user's own session.
