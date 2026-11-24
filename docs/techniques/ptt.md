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

# Pass-the-ticket

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Kerberos ticket** (TGT/TGS) in a logon session.

## Detection
**4768/4769** from a host that did not perform the initial auth; anomalous ticket lifetimes.

---

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [MITRE ATT&CK: T1550.003](https://attack.mitre.org/techniques/T1550/003/)
