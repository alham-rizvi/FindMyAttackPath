---
id: adcs_esc3
type: technique
label: "AD CS ESC3 (enrollment-agent policy)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Monitor enrollment-agent issuance, requester/subject differences, required signatures, and enrollment-agent template ACL changes."
mitre: "T1649"
tag: null
---

# AD CS ESC3 (enrollment-agent policy)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Certificate template** with the **Certificate Request Agent EKU** and low-priv enrolment.

## Detection
**4886** with **`RequesterName` ≠ `Subject`** (on-behalf-of) in the CA log. Restrict agent templates to enrolment agents.

---

## References

- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
