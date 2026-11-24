---
id: ptt
type: technique
label: "Pass-the-ticket"
phase: "lateral"
tools: ["rubeus", "mimikatz"]
cve: null
detect: "A 4769 with no preceding 4768 from that host."
mitre: "T1550.003"
tag: null
---


# Pass-the-ticket

### Affected object / attribute
**Kerberos ticket** (TGT/TGS) in a logon session.

### Concept (deep)
Inject a **TGT/TGS** into a session; no password/hash needed. Linux uses `KRB5CCNAME`; Windows uses `Rubeus ptt`/`kerberos::ptt`.

### Commands
```bash
