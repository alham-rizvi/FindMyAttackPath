---
id: unconstrained_deleg
type: technique
label: "Unconstrained delegation abuse"
phase: "privesc"
tools: ["petitpotam", "krbrelayx", "rubeus"]
cve: null
detect: "Rubeus-style TGT caching; correlated 4624/4768 events."
mitre: "T1558"
tag: null
---
Coerce a privileged account to authenticate to a server trusted for unconstrained delegation, then lift its cached TGT.

## Prerequisite
A host configured for unconstrained delegation, plus a coercion primitive.

## How it works

With unconstrained Kerberos delegation, a service can receive a user's forwarded TGT and may retain it for later use. If a privileged identity authenticates to a server configured this way, compromise of that server can expose credentials with broad domain reach. The risk arises from the combination of sensitive incoming authentication and a delegation configuration that lacks a constrained service boundary.

## Defensive checks

Remove unconstrained delegation where possible, protect domain controllers and privileged accounts from authenticating to delegated hosts, and use the Protected Users group or equivalent controls where appropriate. Monitor delegation settings and unexpected TGT-related activity on servers; investigate the host's recent authentication history.

## References

- [MITRE ATT&CK: Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
- [Microsoft: Kerberos constrained delegation overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-constrained-delegation-overview)
