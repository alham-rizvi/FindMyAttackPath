---
id: ptt
type: technique
label: "Pass-the-ticket"
phase: "lateral"
tools: ["rubeus", "mimikatz"]
cve: null
detect: "A 4769 with no preceding 4768 from that host."
mitre: "T1550.003"
tag: null
---
Inject a stolen Kerberos ticket into the current session to access remote services as its owner.

## Prerequisite
A captured TGT or TGS.

## How it works

Kerberos tickets are bearer credentials for a particular identity and scope. If a valid ticket is stolen from a logon session or other protected store, it may be presented to the services for which it was issued until it expires or is invalidated. A TGT and a service ticket have different scopes, and possession does not grant rights beyond the represented identity's permissions.

## Defensive checks

Protect privileged logon sessions and ticket caches, use Credential Guard where appropriate, and avoid reusing high-value identities across lower-trust hosts. Monitor Kerberos service-ticket use that lacks an expected authentication history or originates from an unusual host, and consider session revocation and secret rotation during response.

## References

- [MITRE ATT&CK: Pass the Ticket](https://attack.mitre.org/techniques/T1550/003/)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
