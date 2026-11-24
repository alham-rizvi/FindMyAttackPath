---
id: pwspray
type: technique
label: "Password spraying"
phase: "initial"
tools: ["kerbrute", "netexec"]
cve: null
detect: "4625 bursts across many accounts from one source."
mitre: "T1110.003"
tag: null
---

# Password spraying

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**User credentials** — one password across many users.

## Detection
**4625/4771 bursts** per account; **4768 pre-auth failures**; smart lockout + conditional access.

---

## References

- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1110.003](https://attack.mitre.org/techniques/T1110/003/)
