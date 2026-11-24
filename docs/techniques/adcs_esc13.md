---
id: adcs_esc13
type: technique
label: "AD CS ESC13 (issuance-policy group mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review issuance-policy OID mappings and correlate issued policies with certificate-authentication and authorization decisions."
mitre: "T1649"
tag: null
---

# AD CS ESC13 (issuance-policy group mapping)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`msDS-OIDToGroupLink`** linking an issuance policy OID to a privileged group.

## Detection
OID group links to **Domain Admins/EA**; **5136** on OID objects; **4886** for the policy template.

---

## References

- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
