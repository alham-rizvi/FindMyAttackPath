---
id: silver
type: technique
label: "Silver ticket"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "A 4769 for that service with no prior 4768."
mitre: "T1558.002"
tag: null
---
Forge a TGS for one specific service using that service account's own hash, bypassing the DC entirely for that ticket.

## Prerequisite
A service account's NTLM hash.

## How it works

A Silver Ticket is a forged Kerberos service ticket protected with the key of a particular service account. If the service accepts the ticket, an attacker may access that service as the represented identity without requesting a ticket from the domain controller at that time. The scope is generally limited to the service whose key is compromised, unlike compromise of the domain's krbtgt key.

## Defensive checks

Use long, rotated service-account secrets or gMSAs, minimize service privileges, and monitor service-side logons and endpoint activity rather than expecting the KDC to record every forged ticket. Investigate service access that lacks a plausible authentication history, while accounting for legitimate ticket caching and audit gaps.

## References

- [MITRE ATT&CK: Silver Ticket](https://attack.mitre.org/techniques/T1558/002/)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
