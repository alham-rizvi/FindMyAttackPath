---
id: sidhistory
type: technique
label: "SID history injection"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "4765/4766 SID-history change events."
mitre: "T1134.005"
tag: null
---

# SID history injection

SID history preserves migration-compatible SIDs on an account. It has impact only if the trust/PAC and resource ACL accept the extra SID.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

sIDHistory, account/domain SIDs, resource group SIDs, trust direction/type, SID filtering/quarantine, migration tools, PAC and target ACL are central.

## Prerequisite chain

A principal or migration process needs ability to modify or legitimate use the SID-history state, and a target trust/resource must accept a privileged SID.


## Impact limits and failure cases

Trust and resource scope, SID filtering/quarantine, selective authentication, account state and PAC/KDC behavior can ignore or reject it. SID history outside the trusting resource’s scope does not grant access.

## Detection and validation

Audit 4765/4766 and 5136 SID-history changes, migration activity and cross-trust privileged resource use. Correlate account, SID, source/target domain and resource.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict migration/DC rights, apply SID filtering/quarantine, remove obsolete SID history after migration and review cross-trust groups.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1134.005](https://attack.mitre.org/techniques/T1134/005/)
