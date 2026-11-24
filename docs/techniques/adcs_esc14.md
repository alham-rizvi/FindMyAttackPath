---
id: adcs_esc14
type: technique
label: "AD CS ESC14 (explicit certificate mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Audit altSecurityIdentities changes and correlate explicit mappings with certificate-based authentication."
mitre: "T1649"
tag: null
---

# AD CS ESC14 (explicit certificate mapping)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Template ACEs** — `WriteProperty` on `msPKI-Certificate-Name-Flag`.

## Detection
**5136** on templates; baseline template ACLs.

---

## References

- [Microsoft: KB5014754 certificate-based authentication changes](https://support.microsoft.com/kb/5014754)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
