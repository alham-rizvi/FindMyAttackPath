---
id: rbcd
type: technique
label: "Resource-Based Constrained Delegation (RBCD)"
phase: "privesc"
tools: ["impacket", "rubeus", "rbcdpy", "powermad"]
cve: null
detect: "Attribute write on msDS-AllowedToActOnBehalfOfOtherIdentity."
mitre: "T1558"
tag: "new"
---
Write delegation rights onto a computer object you control, then impersonate any user through it.

## Prerequisite
Write access to msDS-AllowedToActOnBehalfOfOtherIdentity on a target computer.

## How it works

Resource-Based Constrained Delegation (RBCD) stores delegation policy on the resource computer. A principal with write access to that policy may authorize a service identity to act on behalf of users to the target, subject to Kerberos configuration and target permissions. The security boundary is therefore the ability to change the resource's delegation descriptor.

## Defensive checks

Restrict write access to computer objects and delegation attributes, review RBCD configuration on sensitive servers, and alert on unexpected changes to msDS-AllowedToActOnBehalfOfOtherIdentity. Correlate changes with subsequent Kerberos service-ticket activity and remove unauthorized entries after preserving evidence.

## References

- [MITRE ATT&CK: Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
- [Microsoft: Kerberos constrained delegation overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-constrained-delegation-overview)
