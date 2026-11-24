---
id: trust_ticket
type: technique
label: "Inter-forest trust-ticket abuse"
phase: "hybrid"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4769 for a cross-realm TGS."
mitre: "T1482 / T1558"
tag: null
---

# Inter-forest trust-ticket abuse

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Inter-realm trust key** (`trustedDomain` object / `krbtgt` of the trusted domain).

## Detection
**4769 cross-realm** with SID filtering bypass; enable **SID filtering** (`Quarantine`) and rotate trust keys.

---

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1482](https://attack.mitre.org/techniques/T1482/)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
