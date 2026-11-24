---
id: adcs_esc15
type: technique
label: "AD CS ESC15 (legacy template application policy)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Inventory schema-version-1 templates and compare issued application-policy extensions with the template's intended purpose."
mitre: "T1649"
tag: null
---

# AD CS ESC15 (legacy template application policy)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`msPKI-Template-Schema-Version = 1`** templates + low-priv enrolment on unpatched CAs.

## Detection
**4886** where **request EKUs ≠ template EKUs**; patch the CA; restrict v1 templates.

---

## References

- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
