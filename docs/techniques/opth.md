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

# Overpass-the-hash

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Kerberos TGT request** using an NT hash.

## Detection
**4768 with `TicketEncryptionType=0x17`** for accounts that normally use AES.

---

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [MITRE ATT&CK: T1550.002](https://attack.mitre.org/techniques/T1550/002/)
