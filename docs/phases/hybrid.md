---
id: hybrid
type: phase
label: "Cross-Forest / Hybrid / Cloud Pivot"
---

# Cross-Forest / Hybrid / Cloud Pivot

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Objective
On-prem ↔ Entra ID pivot.

## Attack surface
**Azure AD Connect** (connector account with replication rights), **PRT theft**, **seamless SSO**, **passkey replay**, **token replay to Graph**.

## Detection
Entra sign-in from atypical ASN, PRT issuance anomalies, AAD Connect service account logons.

---

# PART 3 — `docs/techniques/`

## References

- [MITRE ATT&CK: Cloud Accounts](https://attack.mitre.org/techniques/T1078/004/)
- [Microsoft: How Microsoft Entra Connect works](https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-azure-ad-connect)
- [Microsoft: Primary Refresh Tokens](https://learn.microsoft.com/entra/identity/devices/concept-primary-refresh-token)
- [FIDO Alliance: Passkeys](https://fidoalliance.org/passkeys/)
