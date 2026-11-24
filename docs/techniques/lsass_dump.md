---
id: lsass_dump
type: technique
label: "LSASS memory dumping"
phase: "cred"
tools: ["mimikatz"]
cve: null
detect: "Sysmon EID 10 — process access to lsass.exe."
mitre: "T1003.001"
tag: null
---

# LSASS memory dumping

LSASS credential dumping seeks secret/ticket material from LSASS process or logon state rather than directory or file stores.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

LSASS.exe and credential providers, logon sessions, Kerberos/NTLM/DPAPI state, LSASS protection/PPL/Credential Guard, process handle/access policy and endpoint security are relevant.

## Prerequisite chain

The process context needs OS/API permission to access LSASS, and credential material must exist in a usable logon/session context. PPL/Credential Guard/EDR can prevent access.


## Impact limits and failure cases

Credential Guard, HVCI/PPL, logon type, account state and session lifetime affect which artifacts remain usable. A memory fragment or hash may be stale or local-only.

## Detection and validation

Use process-access telemetry (Sysmon 10 or equivalent), LSASS memory dump/create events, protected-process/EDR alerts and subsequent authentication. Correlate account, source host and logon type.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Enable supported Credential Guard/PPL/HVCI and application control, restrict local admin/debug rights and privileged logons.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1003.001](https://attack.mitre.org/techniques/T1003/001/)
