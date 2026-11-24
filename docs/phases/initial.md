---
id: initial
type: phase
label: "Initial Access & Foothold"
---

# Initial Access & Foothold

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Objective
Obtain the first valid credential or session without privileges.

## Attack surface
Username harvesting → **password spraying** (respect lockout policy) → **AS-REP roasting** → **anonymous LDAP/SMB** → **LLMNR/NBT-NS poisoning + relay**.

## Detection
**4625/4771 bursts**, **4768 `PreAuthType=0`** for AS-REP, LLMNR/NBT-NS responses from a non-DNS host, and NTLM relay traffic to LDAP/SMB.

---

## References

- [MITRE ATT&CK: Initial Access](https://attack.mitre.org/tactics/TA0001/)
- [MITRE ATT&CK: Valid Accounts](https://attack.mitre.org/techniques/T1078/)
- [Microsoft: Security guidance for NTLM](https://learn.microsoft.com/windows-server/security/kerberos/ntlm-overview)
