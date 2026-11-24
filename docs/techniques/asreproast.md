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
Request an AS-REP for accounts with Kerberos pre-auth disabled and crack it offline.

## Prerequisite
At least one account with pre-auth disabled.

## How it works

Kerberos pre-authentication normally requires proof of knowledge of an account secret before the domain controller returns an authentication response. When pre-authentication is disabled, an unauthenticated requester can obtain an AS-REP whose encrypted portion is derived from the account's key. An attacker can attempt password guesses against that material offline; the account is exposed only if its password is guessable.

## Defensive checks

Enable Kerberos pre-authentication for accounts unless a documented compatibility requirement prevents it. Review directory settings for exceptions, prioritize privileged and service identities, and monitor Event 4768 for requests involving accounts configured without pre-authentication.

## References

- [MITRE ATT&CK: AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
