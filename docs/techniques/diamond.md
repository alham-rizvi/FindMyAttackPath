---
id: diamond
type: technique
label: "Diamond ticket"
phase: "persist"
tools: ["rubeus"]
cve: null
detect: "Subtle, hard-to-spot field inconsistencies on an otherwise valid TGT."
mitre: "T1558.001"
tag: "new"
---

# Diamond ticket

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**A legitimate TGT** whose **PAC is modified and re-signed** with the `krbtgt` key.

## Detection
**4768 followed by 4769** for a user whose **PAC group membership exceeds AD truth**; PAC validation anomalies.

---

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558.001](https://attack.mitre.org/techniques/T1558/001/)
