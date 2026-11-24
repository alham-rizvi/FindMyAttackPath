---
id: gpo_abuse
type: technique
label: "GPO abuse (writable linked policy)"
phase: "privesc"
tools: ["sharpgpoabuse", "gpoddity"]
cve: null
detect: "GPO edit events; new scheduled-task GPO content."
mitre: "T1484.001"
tag: null
---


# GPO abuse (writable linked policy)

### Affected object / attribute
**Group Policy Container** (`groupPolicyContainer`) and **SYSVOL** GPO files.

### Concept (deep)
Edit a GPO linked to OUs containing privileged users/computers → push **scheduled task**, **script**, or **local admin**. Applies at next refresh (90 min ± jitter).

### Commands
```powershell
