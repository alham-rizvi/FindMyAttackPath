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
Request TGS tickets for SPN-bearing accounts and crack the service-account password offline.

## Prerequisite
Any domain user; target has an SPN.

## How it works

Kerberos service tickets are encrypted using key material associated with the service account. A domain user can request a ticket for a service principal name; if the service account password is weak, the returned ticket material may support offline password guessing. No access to the service itself is required to request a ticket, but successful guessing depends on the account's secret strength.

## Defensive checks

Use long, randomly generated service-account secrets or gMSAs, remove unused SPNs, and avoid RC4 where compatibility permits. Review Event 4769 for unusual ticket volume, encryption-type changes, and requests to rarely used SPNs; correlate with the requesting identity and endpoint.

## References

- [MITRE ATT&CK: Kerberoasting](https://attack.mitre.org/techniques/T1558/003/)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
