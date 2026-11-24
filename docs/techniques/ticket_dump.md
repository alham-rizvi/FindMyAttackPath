---
id: ticket_dump
type: technique
label: "Kerberos ticket extraction"
phase: "cred"
tools: ["rubeus", "mimikatz", "kekeo"]
cve: null
detect: "LSA cache access; unusual 4769 patterns."
mitre: "T1558"
tag: null
---

# Kerberos ticket extraction

Ticket dumping acquires cached TGT/TGS artifacts from LSA/logon state. Usefulness depends on ticket type, context and the service/realm that will accept it.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

LSA cache/logon session, TGT/TGS, account/PAC/SPN/realm, encryption, lifetime, KDC and target service are central.

## Prerequisite chain

Access to the relevant cache/session and a compatible security context must exist. The ticket must remain valid and target a reachable service.


## Impact limits and failure cases

Ticket protection/PPL/Credential Guard, logon type/session, clock, account state, PAC and target ACL limit reuse. Cache presence is not proof of export or compromise.

## Detection and validation

Monitor LSASS ticket-cache/process access, 4769 anomalies and unexpected account/ticket use from hosts. Correlate source logon session and target SPN.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Protect privileged sessions/LSA and enable supported credential isolation.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
