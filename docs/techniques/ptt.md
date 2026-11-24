---
id: ptt
type: technique
label: "Pass-the-ticket"
phase: "lateral"
tools: ["rubeus", "mimikatz"]
cve: null
detect: "A 4769 with no preceding 4768 from that host."
mitre: "T1550.003"
tag: null
---

# Pass-the-ticket

Pass-the-ticket reuses a cached or acquired TGT/TGS within a compatible realm and service context.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

LSA ticket cache/logon session, TGT/TGS, account/PAC/SPN/realm, encryption type/key, lifetime, KDC and target service authorization are central.

## Prerequisite chain

A usable ticket and a security context/KDC/service that accepts it are required. The target SPN and account/PAC scope must match.


## Impact limits and failure cases

Ticket protection, PPL/Credential Guard, logon type/session, clock, account state, realm/SPN and target ACL affect reuse. Cached presence does not prove export or resource access.

## Detection and validation

Look for 4769 without matching 4768, ticket-cache/process access, anomalous SPN/source host and later service access. Correlate account and logon-session context.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Protect LSA and privileged sessions, enable supported credential isolation and restrict admin logons.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [MITRE ATT&CK: T1550.003](https://attack.mitre.org/techniques/T1550.003/)
