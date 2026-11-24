---
id: constrained_deleg
type: technique
label: "Constrained delegation abuse (S4U2Self/S4U2Proxy)"
phase: "privesc"
tools: ["rubeus", "impacket"]
cve: null
detect: "4769 showing S4U flags set."
mitre: "T1558"
tag: null
---
Use an account's allowed delegation to impersonate any user to one specific service.

## Prerequisite
Control of an account with constrained delegation configured.

## How it works

Constrained delegation allows a service identity to request tickets to a limited set of downstream services on behalf of users. If an attacker controls that service identity and its configuration permits sensitive targets or identities, the delegated path may exceed the intended business purpose. The configured service list, protocol transition setting, and target service authorization determine the actual impact.

## Defensive checks

Inventory delegation settings and allowed-to-delegate targets, remove unused entries, and avoid granting protocol transition or delegation to privileged services without a clear need. Monitor changes to delegation-related attributes and correlate S4U Kerberos activity with the service account and destination.

## References

- [MITRE ATT&CK: Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
- [Microsoft: Kerberos constrained delegation overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-constrained-delegation-overview)
