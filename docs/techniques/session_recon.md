---
id: session_recon
type: technique
label: "Session & share reconnaissance"
phase: "recon"
tools: ["sauroneye", "snaffler", "netexec"]
cve: null
detect: "NetSessionEnum calls; 5140/5145 share-access events."
mitre: "T1135 / T1049"
tag: null
---


# Session & share reconnaissance

### Affected object / attribute
**Logon sessions** on hosts.

### Concept (deep)
Who is logged on where → where privileged credentials live. NetExec sessions/users, `qwinsta`, `net session`.

### Commands
```bash
