---
id: ticket_dump
type: technique
label: "Kerberos ticket extraction"
phase: "cred"
tools: ["rubeus", "mimikatz", "kekeo"]
cve: null
detect: "LSA cache access; unusual 4769 patterns."
mitre: "T1558"
tag: null
---

# Kerberos ticket extraction

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Kerberos tickets** in LSASS memory.

## Detection
**Sysmon 10** on LSASS; **4768/4769** anomalies; LSA protection.

---

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
