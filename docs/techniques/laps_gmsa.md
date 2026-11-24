---
id: laps_gmsa
type: technique
label: "LAPS / gMSA readable-password discovery"
phase: "recon"
tools: ["lapstoolkit", "powerview"]
cve: null
detect: "LDAP reads of ms-Mcs-AdmPwd or msDS-ManagedPassword."
mitre: "T1552"
tag: null
---

# LAPS / gMSA readable-password discovery

LAPS and gMSA are managed credential services. Exposure depends on whether an identity has effective rights to retrieve the relevant password and whether the target accepts it.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Windows LAPS legacy/modern password attributes, gMSA `msDS-ManagedPassword`, retrieval ACL/`PrincipalsAllowedToRetrieveManagedPassword`, gMSA host membership, KDS root key, DC replication and target host state are relevant.

## Prerequisite chain

The principal needs effective read rights and a target authorized to use or accept the credential. The managed secret must be current and usable; attribute visibility alone is not success.


## Impact limits and failure cases

LAPS version/encryption, ACL inheritance, gMSA host membership, RODC replication, password age and target authentication policy can limit impact. Encrypted LAPS and host isolation reduce exposure.

## Detection and validation

Audit LDAP 4662 reads of password attributes, ACL/host-membership changes, retrieval-host activity and unexpected local/service logons. Baseline approved password-management and gMSA access.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict readers, enable encrypted/current LAPS as supported, remove broad management groups and isolate retrieval hosts.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1552](https://attack.mitre.org/techniques/T1552/)
