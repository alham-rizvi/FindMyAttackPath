---
id: lsass_dump
type: technique
label: "LSASS memory dumping"
phase: "cred"
tools: ["mimikatz"]
cve: null
detect: "Sysmon EID 10 — process access to lsass.exe."
mitre: "T1003.001"
tag: null
---


# LSASS memory dumping

### Affected object / attribute
**LSASS process memory** on a host.

### Concept (deep)
LSASS holds NT hashes, Kerberos tickets, and (if WDigest) cleartext. Local admin can dump via `comsvcs.dll`/`procdump`; remote tooling (`lsassy`, `nanodump`) avoids dropping files.

### Commands
```bash
