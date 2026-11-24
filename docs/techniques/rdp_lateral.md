---
id: rdp_lateral
type: technique
label: "RDP lateral movement & session hijacking"
phase: "lateral"
tools: []
cve: null
detect: "4624 type 10; tscon.exe invocation."
mitre: "T1021.001 / T1563.002"
tag: null
---
Move interactively via RDP, including taking over another user's disconnected session on a shared host.

## Prerequisite
RDP access, or local admin on a host with a cached session.
