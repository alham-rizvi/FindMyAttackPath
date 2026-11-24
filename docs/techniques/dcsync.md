---
id: dcsync
type: technique
label: "DCSync"
phase: "persist"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4662 with the replication-GUID access mask, from a non-DC source."
mitre: "T1003.006"
tag: null
---


# DCSync

### Affected object / attribute
**Domain NC root** — extended rights **`DS-Replication-Get-Changes`** and **`DS-Replication-Get-Changes-All`**.

### Concept (deep)
Impersonate a DC over **MS-DRSR**. A real DC replicates password data to you if your principal holds the replication rights. No LSASS touch. By default only **Domain Admins**, **Enterprise Admins**, and **DC machine accounts** hold these rights, but they are often delegated to backup/service accounts.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as principal with repl rights
    participant DC
    A->>DC: DRSUAPI GetNCChanges
    DC-->>A: NTLM hashes, Kerberos keys, pwd history
    A->>A: krbtgt → Golden; DA hash → PTH
```

### Exhaustive commands
```bash
