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

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**SYSVOL `Groups.xml`** (and `Services.xml`, `ScheduledTasks.xml`) — `cpassword`.

## Detection
**5145** SYSVOL read of `Groups.xml`; remove `cpassword` from SYSVOL; prefer LAPS/gMSA.

---

## References

- [Microsoft: MS14-025 security update for Group Policy Preferences](https://learn.microsoft.com/en-us/security-updates/securitybulletins/2014/ms14-025)
- [MITRE ATT&CK: Credentials In Files](https://attack.mitre.org/techniques/T1552/001/)
