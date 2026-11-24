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
