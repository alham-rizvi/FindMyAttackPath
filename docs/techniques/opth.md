---
id: opth
type: technique
label: "Overpass-the-hash"
phase: "lateral"
tools: ["rubeus", "mimikatz"]
cve: null
detect: "4768 issued immediately from a non-interactive context."
mitre: "T1550.002"
tag: null
---
Convert a stolen NTLM hash into a full Kerberos TGT, moving an NTLM-only foothold onto the Kerberos path.

## Prerequisite
An NTLM hash or AES key.

## How it works

Overpass-the-hash uses password-derived key material to obtain Kerberos authentication rather than relying on an NTLM network logon. If a valid account key is exposed, a Kerberos ticket may be requested and then used according to the account's permissions and ticket scope. The technique changes the authentication mechanism; it does not elevate the account by itself.

## Defensive checks

Protect password-derived keys, reduce legacy NTLM use, isolate privileged sessions, and monitor unexpected ticket-granting-ticket requests from endpoints or logon contexts that do not normally use the account. Investigate the original key exposure as well as any resulting Kerberos activity.

## References

- [MITRE ATT&CK: Pass the Hash](https://attack.mitre.org/techniques/T1550/002/)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
