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
Edit a Group Policy Object you control write access to, pushing a malicious scheduled task to its linked OU.

## Prerequisite
Write access to a GPO linked to a target OU.

## How it works

Group Policy Objects distribute configuration to the users and computers within their scope. A principal who can alter a linked policy may change settings that execute or configure behavior on affected systems, potentially with the authority of the computer or user applying the policy. Risk depends on the GPO's link, filtering, precedence, and the attacker's effective edit rights.

## Defensive checks

Restrict GPO editing to designated administrators, monitor directory and SYSVOL changes, and review new scripts, scheduled tasks, services, and security settings in policy. Alert on edits to policies linked to privileged OUs and reconcile GPO versions with approved change records.

## References

- [MITRE ATT&CK: Group Policy Modification](https://attack.mitre.org/techniques/T1484/001/)
- [Microsoft: Group Policy overview](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview)
