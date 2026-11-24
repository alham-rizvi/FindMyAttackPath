---
id: adcs_esc11
type: technique
label: "AD CS ESC11 (RPC enrollment relay exposure)"
phase: "privesc"
tools: ["certipy"]
cve: null
detect: "Review RPC enrollment privacy enforcement and correlate NTLM authentication, RPC enrollment traffic and CA issuance."
mitre: "T1649"
tag: null
---

# AD CS ESC11 (RPC enrollment relay exposure)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**CA RPC interface (ICertPassage)** — lack of packet integrity/privacy enforcement.

## Detection
NTLM on CA RPC (TCP 135 → high port); **4886** issued to a non-requester.

---

## References

- [Microsoft Open Specifications: MS-WCCE Certificate Enrollment](https://learn.microsoft.com/openspecs/windows_protocols/ms-wcce/)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
