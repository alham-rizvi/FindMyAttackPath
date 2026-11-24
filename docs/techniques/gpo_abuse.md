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
