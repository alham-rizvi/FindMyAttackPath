---
id: dcshadow
type: technique
label: "DCShadow"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "Unexpected new DC registration; replication from an unrecognized server."
mitre: "T1207"
tag: null
---
Temporarily register a rogue domain controller to push an attacker-chosen change into replication, bypassing normal AD audit logging.

## Prerequisite
Domain Admin-equivalent rights, plus rights to register a server as a DC.
