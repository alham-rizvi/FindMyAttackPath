---
id: asreproast
type: technique
label: "AS-REP roasting"
phase: "initial"
tools: ["rubeus", "impacket", "hashcat"]
cve: null
detect: "4768 with pre-authentication disabled."
mitre: "T1558.004"
tag: null
---

# AS-REP roasting

Kerberos pre-authentication normally requires the account key before the KDC issues an AS-REP. The AS-REP roasting hypothesis applies only to accounts configured not to require it.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

The relevant account flags (`DONT_REQ_PREAUTH`/`UF_DONT_REQUIRE_PREAUTH`), sAMAccountName/UPN, supported ticket encryption types, KDC, AS-REP, account password and account privilege/reuse are the core evidence.

## Prerequisite chain

An account with pre-authentication disabled must be visible to the KDC and return AS-REP material. Offline recovery depends on password strength and ticket encryption; no password guessing is described here.


## Impact limits and failure cases

A weak or reused password has greater impact, but a strong password or unprivileged account may yield no practical privilege. Account lockout does not prevent offline verification after AS-REP material exists.

## Detection and validation

Review 4768 AS exchanges and pre-authentication failures, account UAC/flag changes, and later use of the account. Baseline normal legacy accounts and correlate 4768 with the KDC, source and target account.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove pre-authentication exemptions except for documented compatibility, enforce strong unique passwords and AES as compatible, restrict account privilege, and rotate exposed secrets.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558.004](https://attack.mitre.org/techniques/T1558.004/)
