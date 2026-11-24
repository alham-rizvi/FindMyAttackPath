---
id: machineaccountquota
type: technique
label: "MachineAccountQuota abuse"
phase: "privesc"
tools: ["powermad", "impacket"]
cve: null
detect: "Unusual volume of computer-object creation from one user."
mitre: "T1136.002"
tag: null
---
Use the default right every domain user has to create computer accounts, producing a controlled machine identity for delegation or noPac-style attacks.

## Prerequisite
Default MachineAccountQuota (10) still in effect.

## How it works

Active Directory can allow ordinary users to create a limited number of computer objects. A newly controlled machine identity may be useful for legitimate management, but in combination with other weak delegation or authentication settings it can become a stepping stone. The quota alone does not grant administrator access.

## Defensive checks

Set the quota to the lowest value compatible with operations, manage computer-object creation through controlled workflows, and review the creator and owner of unexpected computer accounts. Alert on unusual creation bursts and remove stale or unauthorized machine objects after verifying dependencies.

## References

- [MITRE ATT&CK: Create Account: Domain Account](https://attack.mitre.org/techniques/T1136/002/)
- [Microsoft: MachineAccountQuota attribute](https://learn.microsoft.com/windows/win32/adschema/a-ms-ds-machineaccountquota)
