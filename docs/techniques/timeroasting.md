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
Request MS-SNTP time responses to recover crackable machine-account hashes without any domain authentication at all.

## Prerequisite
Network reachability to a domain controller.

## How it works

Timeroasting refers to querying the Windows time service for responses associated with domain computer accounts and testing the resulting password-derived material offline. It targets weak machine-account secrets rather than a user's interactive password. Whether a response is useful depends on the account and service behavior; successful recovery still requires a guessable secret.

## Defensive checks

Use the platform's strong managed machine-account passwords and avoid manually configured weak secrets. Monitor unusual time-service query patterns from endpoints that have no operational reason to query the domain controller at that rate, and investigate alongside account and host telemetry. Do not block normal time synchronization without assessing domain impact.

## References

- [MITRE ATT&CK: Brute Force](https://attack.mitre.org/techniques/T1110/)
- [Microsoft Open Specifications: Simple Network Time Protocol](https://learn.microsoft.com/openspecs/windows_protocols/ms-sntp/)
