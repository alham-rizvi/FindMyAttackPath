---
id: dcsync
type: technique
label: "DCSync"
phase: "persist"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4662 with the replication-GUID access mask, from a non-DC source."
mitre: "T1003.006"
tag: null
---

# DCSync

DCSync uses MS-DRSR directory-replication operations to retrieve replicated object and, for authorized replicas, credential data.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Replication rights and GUID access masks (Replicate Directory Changes / All), naming contexts, DC/RODC scope, NTDS objects, krbtgt/user/computer secret data and the receiving DC identity are central.

## Prerequisite chain

The principal needs effective replication rights in the scoped naming context and MS-DRSR network access to a DC. RODC/filtered-attribute scope may limit secret visibility.


## Impact limits and failure cases

Impact is limited to the naming context and secret fields exposed. Domain/forest scope, RODC policy, ACL changes and key/credential rotation determine which secrets remain usable.

## Detection and validation

Audit 4662 for replication control GUID access masks, especially from non-DC hosts/accounts. Correlate DRS RPC, NC reads, DC topology and later account/secret use.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove replication rights from non-DC identities, audit ACL inheritance and tier administration, and restrict DC network access.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1003.006](https://attack.mitre.org/techniques/T1003.006/)
