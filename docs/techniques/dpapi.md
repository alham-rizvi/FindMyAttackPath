---
id: dpapi
type: technique
label: "DPAPI / credential-vault decryption"
phase: "cred"
tools: ["mimikatz", "dploot", "donpapi"]
cve: null
detect: "DPAPI master-key access events."
mitre: "T1555"
tag: null
---

# DPAPI / credential-vault decryption

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**DPAPI master keys / domain backup key** on the DC.

## Detection
Access to `%APPDATA%\Microsoft\Protect`; **4662** on the `BCKUPKEY` container; backup-key export audit.

---

## References

- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1555](https://attack.mitre.org/techniques/T1555/)
