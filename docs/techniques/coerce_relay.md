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

# Coerced authentication → NTLM relay

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Authentication coercion** (EFSRPC, RPRN, DFSNM) + **relay target** (SMB/LDAPS/HTTP).

## Detection and defensive measures
**4624 type 3** to attacker; EFSRPC/RPRN/DFSNM RPC calls; enable **SMB/LDAP signing** + **EPA**; disable the Spooler on DCs.

---

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1187](https://attack.mitre.org/techniques/T1187/)
- [MITRE ATT&CK: T1557.001](https://attack.mitre.org/techniques/T1557/001/)
