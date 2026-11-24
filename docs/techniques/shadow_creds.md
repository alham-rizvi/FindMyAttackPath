---
id: shadow_creds
type: technique
label: "Shadow Credentials attack"
phase: "privesc"
tools: ["whisker", "pywhisker", "certipy", "pkinittools"]
cve: null
detect: "5136 on msDS-KeyCredentialLink."
mitre: "T1556"
tag: "new"
---
Add an attacker-controlled key to msDS-KeyCredentialLink on a target object, then authenticate as it via PKINIT.

## Prerequisite
Write access to the target's msDS-KeyCredentialLink attribute.
