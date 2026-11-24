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

Microsoft Entra Connect is the synchronization bridge between selected on-premises AD objects and a Microsoft Entra tenant. “Credential extraction” is meaningful only within the actual sync mode and host trust boundary.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

The sync server and ADSync service, connector configuration and staging database, AD and Entra connector identities, synchronization rules, KDS-related configuration where applicable, and corresponding on-premises/cloud accounts are the principal objects.

## Prerequisite chain

A review requires administrative or protected backup access to the sync host, a defined sync mode (password-hash, pass-through, staging, or staged rules), and evidence of connector permissions. Host privilege is not automatically Microsoft Entra privileged role membership.


## Impact limits and failure cases

Impact depends on connector account permissions, tenant role assignments, sync scope, password-hash/pass-through mode, hybrid sign-in configuration, and tenant protections. A staging host or database copy may not contain usable cloud credentials.

## Detection and validation

Correlate ADSync service and installer activity, changes to synchronization rules/connectors, database or key file access, sync-cycle and export/import logs, on-premises directory changes, and Entra sign-ins or role changes by the connector or sync account.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict interactive/RDP access and tier the sync server; use dedicated, patched hosts; limit connector and tenant role permissions; protect the database/configuration and supported secrets; and inventory synchronization rules. Suspected compromise should isolate the host, preserve evidence, use Microsoft-supported credential rotation/recovery procedures, review sync and tenant changes, and validate clean synchronization before reactivation.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft Entra Connect deployment and security](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-install-roadmap)
- [Microsoft Entra Connect staging server](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-sync-staging-server)
- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1552.001](https://attack.mitre.org/techniques/T1552.001/)
