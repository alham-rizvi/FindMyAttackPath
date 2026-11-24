---
id: aadconnect
type: technique
label: "Entra Connect credential extraction"
phase: "hybrid"
tools: ["aadinternals"]
cve: null
detect: "Access to the ADSync/Entra Connect database."
mitre: "T1552.001"
tag: null
---

# Entra Connect credential extraction

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**AAD Connect connector account** (`MSOL_*`) with **replication rights** on the domain, and the **on-prem sync credentials** stored encrypted in the AAD Connect SQL/LocalDB.

## Impact
- **Domain replication**: DCSync every hash.
- **Tenant takeover**: PHS abuse or connector credential misuse.

## Detection and defensive measures
- **4662** from the `MSOL_*` connector account outside its sync window.
- **Tier-0 the AAD Connect host**; restrict logon; use **gMSA** for the connector where supported.
- **Monitor** AAD Connect service account logons and configuration changes.

---

## References

- [Microsoft Entra Connect deployment and security](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-install-roadmap)
- [Microsoft Entra Connect staging server](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-sync-staging-server)
- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1552.001](https://attack.mitre.org/techniques/T1552/001/)
