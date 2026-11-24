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
Harvest cached TGT/TGS tickets from the LSA cache for reuse elsewhere.

## Prerequisite
Local admin, or the owning user's own session.

## How it works

Windows caches Kerberos tickets in logon sessions so users and services can authenticate without entering credentials for every request. Access to a session's ticket cache can expose ticket material that may be usable until expiration or invalidation. A ticket is scoped by its service, identity, lifetime, and domain policy; it is not automatically equivalent to the account password.

## Defensive checks

Limit privileged interactive logons, isolate administrative sessions, and enable Credential Guard where appropriate. Monitor access to authentication packages and ticket caches, and correlate ticket requests with source host, account, and expected service use. Responding to suspected ticket theft may require ending affected sessions and rotating the underlying account secret.

## References

- [MITRE ATT&CK: Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
