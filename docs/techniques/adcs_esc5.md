---
id: adcs_esc5
type: technique
label: "AD CS ESC5 (PKI object permissions)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Audit security descriptors and writes on enterprise PKI configuration objects, CA objects, OIDs and trust stores."
mitre: "T1649"
tag: null
---

# AD CS ESC5 (PKI object permissions)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**PKI objects**: CA object, OID containers, **`NTAuthCertificates`**, and the `CN=Public Key Services` subtree.

## Detection
**5136** on `CN=Public Key Services` subtree; restrict write rights to Tier-0.

---

## References

- [Microsoft: Active Directory Certificate Services overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
