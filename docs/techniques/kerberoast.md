---
id: kerberoast
type: technique
label: "Kerberoasting"
phase: "initial"
tools: ["rubeus", "impacket", "hashcat"]
cve: null
detect: "4769 requesting RC4 (etype 0x17) for an unusual SPN."
mitre: "T1558.003"
tag: null
---

# Kerberoasting

Kerberoasting requests service tickets for accounts carrying SPNs. Offline password analysis is the theoretical outcome; ticket or SPN presence alone is not credential compromise.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

SPN-bearing user/computer accounts, TGS-REQ/TGS-REP, ticket encryption types, account password, account privilege/reuse, service authorization and KDC policy are central.

## Prerequisite chain

A valid domain identity and KDC reachability are needed to request a usable TGS for the SPN. Practical impact depends on recovery of a reusable, strong test or real account secret.


## Impact limits and failure cases

Password strength, AES/RC4 policy, account type/privilege/reuse and service authorization determine impact. Account lockout does not protect a ticket from offline verification.

## Detection and validation

Audit 4769 volumes/encryption and SPN source patterns, SPN registration 5136/4738/4742 changes, and target service authentication. Baseline normal service-ticket activity.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Use gMSA or strong random service passwords, disable obsolete RC4/SPNs where compatible, reduce account privilege and remove reused credentials.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558.003](https://attack.mitre.org/techniques/T1558/003/)
