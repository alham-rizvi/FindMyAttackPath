---
id: timeroasting
type: technique
label: "Timeroasting"
phase: "cred"
tools: ["timeroast", "hashcat"]
cve: null
detect: "Anomalous NTP/MS-SNTP query volume against a DC."
mitre: "T1110"
tag: "new"
---

# Timeroasting

Timeroasting concerns whether an MS-SNTP/time implementation exposes machine-account authentication material suitable for offline verification. Ordinary NTP is not enough evidence.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

DC time/MS-SNTP implementation, time protocol responses, machine-account key context, network reachability, Windows build/configuration and the DC account recognized by the protocol are involved.

## Prerequisite chain

A compatible time implementation and endpoint must expose the relevant authentication-bearing response for a recognizable machine account. The response must support the claimed verification; ordinary time data is not sufficient.


## Impact limits and failure cases

OS/build, protocol implementation, network filtering, account key strength/type and patch state determine impact. It is not equivalent to standard NTP and varies by implementation.

## Detection and validation

Monitor anomalous MS-SNTP/NTP query volume/authentication-relevant responses, unusual source hosts and later machine-account authentication. Baseline time synchronization clients.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict time-service exposure, patch DCs and use supported authenticated time sync where appropriate.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Windows Time service](https://learn.microsoft.com/windows-server/networking/windows-time-service/windows-time-service-topology)
- [Microsoft: Windows Time service tools](https://learn.microsoft.com/windows-server/networking/windows-time-service/windows-time-service-tools-and-settings)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1110](https://attack.mitre.org/techniques/T1110/)
