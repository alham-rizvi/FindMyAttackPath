---
id: opth
type: technique
label: "Overpass-the-hash"
phase: "lateral"
tools: ["rubeus", "mimikatz"]
cve: null
detect: "4768 issued immediately from a non-interactive context."
mitre: "T1550.002"
tag: null
---

# Overpass-the-hash

Overpass-the-hash uses account key material to obtain a Kerberos ticket rather than replaying NTLM directly.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

NTLM/account key material, Kerberos AS-REQ/AS-REP, TGT, KDC, ticket cache, encryption/key type, account pre-authentication and target SPN are relevant.

## Prerequisite chain

A current account key and AS exchange accepted by the KDC are required. The resulting ticket must match target realm/SPN and account restrictions.


## Impact limits and failure cases

Pre-authentication, Protected Users, account restrictions, key type/version, clock and target authorization vary. A hash proves key possession only within the protocols that accept it, not automatically a TGT or resource path.

## Detection and validation

Correlate 4768 AS exchanges from unusual key-based contexts, NTLM use, ticket creation and subsequent 4624/4769 resource access.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Disable NTLM where feasible, use Protected Users/modern Kerberos and Credential Guard, and restrict privileged logons.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [MITRE ATT&CK: T1550.002](https://attack.mitre.org/techniques/T1550/002/)
