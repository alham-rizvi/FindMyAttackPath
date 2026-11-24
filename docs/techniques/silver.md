---
id: silver
type: technique
label: "Silver ticket"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "A 4769 for that service with no prior 4768."
mitre: "T1558.002"
tag: null
---

# Silver ticket

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Service account key** (the target service’s password hash/AES key).

## Detection
**4769** where the PAC group SIDs exceed AD truth; service account password rotation; AES-only service accounts.

---

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558.002](https://attack.mitre.org/techniques/T1558/002/)
