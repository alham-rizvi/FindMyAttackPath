---
id: mimikatz
type: tool
label: "mimikatz"
repo: "gentilkiwi/mimikatz"
category: "Credential Access"
---

# mimikatz

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

Credential/ticket/DC toolkit: `sekurlsa::logonpasswords`, `lsadump::dcsync`, `kerberos::golden|ptt`, `lsadump::dcshadow`, `misc::skeleton`. Tier-0 noise; heavily signatured.

## References

- [Project repository: mimikatz](https://github.com/gentilkiwi/mimikatz)
- [Microsoft Learn: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
