---
id: ntds_dump
type: technique
label: "NTDS.dit extraction"
phase: "cred"
tools: ["impacket", "certsync"]
cve: null
detect: "4662 on the NTDS object; VSS shadow-copy events on a DC."
mitre: "T1003.003"
tag: null
---

# NTDS.dit extraction

NTDS.dit is the domain-controller AD database. Dump or export is meaningful only with DC/backup access and the key and replication context needed to interpret data.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

NTDS.dit/ESE database, registry/SYSTEM hive or BOOTKEY context, DC role and backup/VSS state, NTDS object, account/krbtgt/secret data and RODC scope are relevant.

## Prerequisite chain

DC or approved backup access and required key/hive context are required. A database copy may be incomplete, stale or cryptographically unusable outside the recovery context.


## Impact limits and failure cases

DC role, RODC scope, backup/VSS policy, OS keys, secret rotation and replication determine impact. Offline data is not automatically live domain privilege.

## Detection and validation

Audit 4662 on NTDS objects, DC backup/VSS/snapshot activity and NTDS/hive file access from unusual hosts/processes. Correlate DC integrity and later account use.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Harden DC and backup media/access, restrict VSS/NTDS file access and use dedicated backup operations.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1003.003](https://attack.mitre.org/techniques/T1003/003/)
