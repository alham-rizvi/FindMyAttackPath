---
id: adcs_esc1
type: technique
label: "ADCS ESC1"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Certificate issuance (4886/4887) for an unexpected UPN."
mitre: "T1649"
tag: null
---

# ADCS ESC1

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Certificate template** with **enrollee-supplied SAN**, **Client Authentication EKU**, and low-priv enrolment rights.

## Impact
- **Domain Admin NT hash and TGT** in a single enrolment.

## Detection and defensive measures
- **4886/4887** with **SAN ≠ requester**.
- Require **manager approval** (`CT_FLAG_PEND_ALL_REQUESTS`) and remove the **ENROLLEE_SUPPLIES_SUBJECT** flag.
- **Enforce SID binding** (KB5014754 full enforcement).

---

## References

- [Microsoft: AD CS overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
