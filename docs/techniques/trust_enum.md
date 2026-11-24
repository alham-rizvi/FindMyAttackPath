---
id: trust_enum
type: technique
label: "Domain & forest trust mapping"
phase: "recon"
tools: ["powerview", "netexec"]
cve: null
detect: "Trust-object LDAP queries."
mitre: "T1482"
tag: null
---

# Domain & forest trust mapping

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Trust objects** (`trustedDomain`) in the System container.

## Detection
**5136** on `trustedDomain`; baseline trusts.

---

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1482](https://attack.mitre.org/techniques/T1482/)
