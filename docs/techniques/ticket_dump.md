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


# Kerberos ticket extraction

### Affected object / attribute
**Kerberos tickets** in LSASS memory.

### Concept (deep)
Dump tickets from memory for the current session or all sessions; harvest TGTs/TGSs for PTT.

### Commands
```bash
