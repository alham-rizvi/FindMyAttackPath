---
id: gpp_cpassword
type: technique
label: "Group Policy Preferences credential exposure"
phase: "cred"
tools: ["snaffler"]
cve: null
detect: "Review SYSVOL policy files for legacy preference password fields and correlate findings with affected account use."
mitre: "T1552.001"
tag: null
---


# Group Policy Preferences credential exposure

### Affected object / attribute
**SYSVOL `Groups.xml`** (and `Services.xml`, `ScheduledTasks.xml`) — `cpassword`.

### Concept (deep)
The `cpassword` is encrypted with a **publicly known AES key** → decrypt to cleartext.

### Commands
```bash
