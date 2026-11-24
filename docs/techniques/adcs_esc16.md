---
id: adcs_esc16
type: technique
label: "AD CS ESC16 (CA security-extension suppression)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review CA extension-suppression policy and inspect issued certificates for the expected security extension."
mitre: "T1649"
tag: null
---

# AD CS ESC16 (CA security-extension suppression)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**CA-wide `DisableExtensionList`** including the **SID security extension** (`1.3.6.1.4.1.311.25.2`).

## Detection
CA registry **`DisableExtensionList`**; **4886** missing SID extension.

---

## References

- [Microsoft: KB5014754 certificate-based authentication changes](https://support.microsoft.com/kb/5014754)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
