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

# Unconstrained delegation abuse

Unconstrained delegation lets a configured host cache TGTs for users who authenticate to it, creating a sensitive host trust boundary.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Computer account `TRUSTED_FOR_DELEGATION` flag, host TGT cache, SPNs, authentication protocol/source, krbtgt/KDC, account “sensitive/not delegatable” state and Protected Users are central.

## Prerequisite chain

The host must be unconstrained-delegation configured and receive authentication from an account whose ticket is cached. Host control and the ticket remaining usable are required.


## Impact limits and failure cases

Protected Users/not-delegated/sensitive accounts, ticket lifetime, authentication flags and host control limit impact. User TGT scope is not automatically privileged.

## Detection and validation

Monitor delegation flag/SPN changes, privileged 4624/4768 to delegated hosts and LSA/cache access. Correlate account, source host and ticket lifetime.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove unconstrained delegation, use constrained/resource-based patterns, mark sensitive accounts not delegatable and isolate delegated hosts.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
