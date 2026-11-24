---
id: passkey_replay
type: technique
label: "Pass-the-passkey"
phase: "hybrid"
tools: []
cve: null
detect: "FIDO2 authentication anomalies."
mitre: "T1550"
tag: "new"
---

# Pass-the-passkey

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Entra ID passkey (FIDO2)** authentication.

## Detection
Sign-ins with passkey from atypical device/ASN; replay of the same assertion `signCount`; require attested, phishing-resistant authenticators.

---

## References

- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1550](https://attack.mitre.org/techniques/T1550/)
