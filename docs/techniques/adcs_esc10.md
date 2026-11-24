---
id: adcs_esc10
type: technique
label: "AD CS ESC10 (weak certificate mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review domain-controller certificate-mapping policy, compatibility exceptions and authentication events involving certificates."
mitre: "T1649"
tag: null
---

# AD CS ESC10 (weak certificate mapping)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**DC registry `StrongCertificateBindingEnforcement = 0`**.

## Detection
DC registry **4657**; **4768** with mismatched certificate mapping.

---

## References

- [Microsoft: KB5014754 certificate-based authentication changes](https://support.microsoft.com/kb/5014754)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
