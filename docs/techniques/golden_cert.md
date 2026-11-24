---
id: golden_cert
type: technique
label: "Golden certificate (CA key theft)"
phase: "persist"
tools: ["forgecert", "certipy"]
cve: null
detect: "Certificate issuance that bypasses the normal CA request workflow."
mitre: "T1649"
tag: null
---

# Golden certificate (CA key theft)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**CA private key** (CA host compromise or backup).

## Detection
**4886/4887** for certificates whose serial does not match CA issuance logs; CA key export audit.

---

## References

- [Microsoft: AD CS overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
