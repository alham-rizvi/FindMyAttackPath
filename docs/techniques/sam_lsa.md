---
id: sam_lsa
type: technique
label: "SAM / LSA secrets dump"
phase: "cred"
tools: ["impacket"]
cve: null
detect: "Registry hive save/read events; VSS shadow-copy creation."
mitre: "T1003.002"
tag: null
---

# SAM / LSA secrets dump

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Local SAM** and **LSA secrets** on a host.

## Detection
**4656/4663** on registry hives `SAM`/`SECURITY`; `reg save` (**4688**); LSA secret access.

---

## References

- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1003.002](https://attack.mitre.org/techniques/T1003/002/)
