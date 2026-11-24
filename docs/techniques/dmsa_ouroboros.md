---
id: dmsa_ouroboros
type: technique
label: "dMSA Ouroboros credential extraction"
phase: "cred"
tools: []
cve: null
detect: "Directory-service access to dMSA attributes."
mitre: "T1003 (variant)"
tag: "new"
---

# dMSA Ouroboros credential extraction

Delegated Managed Service Accounts introduce migration and self-managed credential state that can expose or repeat managed credential material if readers or migration objects are misconfigured.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

dMSA/migration objects, managed-password or migration attributes, allowed password readers, KDS root key, service host account state, Windows Server 2025 feature/schema support and replication are relevant.

## Prerequisite chain

The dMSA feature and migration state must exist, a principal or host must have authorized retrieval capability, and the service must accept the credential. Attribute presence alone is not a usable secret.


## Impact limits and failure cases

Impact depends on migration state, patch/schema support, host membership, reader ACL, KDS key, account state and credential lifetime. This is highly version and configuration dependent.

## Detection and validation

Audit directory reads/writes to dMSA/managed-password attributes, migration changes, KDS activity and service-host sign-ins. Filter normal gMSA/dMSA retrieval patterns rather than alerting on every read.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Limit managed-password readers, isolate service hosts, apply supported updates, remove incomplete migrations and manage dMSA lifecycle.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1003](https://attack.mitre.org/techniques/T1003/)
