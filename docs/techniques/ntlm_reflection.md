---
id: ntlm_reflection
type: technique
label: "NTLM reflection"
phase: "initial"
tools: ["impacket", "petitpotam"]
cve: "cve-2025-33073"
detect: "Loopback-pattern 4624 type 3; anomalous local relay traffic."
mitre: "T1557.001"
tag: "new"
---
Bypass reflection mitigations to relay a host's own authentication back to itself for SYSTEM execution.

## Prerequisite
Target does not enforce SMB signing.
