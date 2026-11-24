---
id: coerce_relay
type: technique
label: "Coerced authentication → NTLM relay"
phase: "initial"
tools: ["petitpotam", "coercer", "shadowcoerce", "dfscoerce", "impacket", "responder", "mitm6"]
cve: null
detect: "4624 type 3 from a machine account; unexpected outbound auth from a server."
mitre: "T1187 / T1557.001"
tag: null
---
Force a machine account to authenticate to an attacker listener, then relay it to SMB, LDAP or ADCS.

## Prerequisite
Network path to a coercion primitive (spooler, EFSR, FSRVP, DFSNM).

## How it works

Some remote services can be induced to authenticate to another system. If that authentication uses a relayable protocol and the destination does not enforce protections such as signing or channel binding, an intermediary may reuse the authentication attempt against the destination. The chain therefore depends on both an authentication trigger and a separately misconfigured target; either condition alone is insufficient.

## Defensive checks

Reduce unnecessary NTLM, require SMB signing and LDAP signing/channel binding where supported, protect web enrollment with Extended Protection, and restrict outbound authentication from servers. Investigate unexpected machine-account logons and correlate the initiating host, destination, and service rather than relying on one event.

## References

- [MITRE ATT&CK: Forced Authentication](https://attack.mitre.org/techniques/T1187/)
- [MITRE ATT&CK: LLMNR/NBT-NS Poisoning and SMB Relay](https://attack.mitre.org/techniques/T1557/001/)
- [Microsoft: LDAP signing](https://learn.microsoft.com/windows-server/identity/ad-ds/ldap-signing)
