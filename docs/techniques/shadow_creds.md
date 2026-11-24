---
id: shadow_creds
type: technique
label: "Shadow Credentials attack"
phase: "privesc"
tools: ["whisker", "pywhisker", "certipy", "pkinittools"]
cve: null
detect: "5136 on msDS-KeyCredentialLink."
mitre: "T1556"
tag: "new"
---

# Shadow Credentials attack

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`msDS-KeyCredentialLink`** on a user or computer.

## Detection
**5136** on `msDS-KeyCredentialLink`; **PKINIT** within 5 minutes of the key write; alert on key additions by non-helpdesk.

---

## References

- [Microsoft: AD CS overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1556](https://attack.mitre.org/techniques/T1556/)
