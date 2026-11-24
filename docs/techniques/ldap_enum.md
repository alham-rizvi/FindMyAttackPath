---
id: ldap_enum
type: technique
label: "LDAP / ADSI enumeration"
phase: "recon"
tools: ["powerview", "adrecon", "adpeas", "adcollector", "ldapsearch-ad", "windapsearch", "adsearch"]
cve: null
detect: "Directory Service Access (4662); elevated LDAP query volume."
mitre: "T1087.002"
tag: null
---

# LDAP / ADSI enumeration

LDAP is the directory discovery protocol used to enumerate AD users, groups, ACLs, GPOs, trusts and operational attributes. Enumeration is often normal and low impact alone.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

LDAP naming contexts and GC, rootDSE/referrals, bind/transport, objectClass/attributes and ACL visibility are central. Read rights differ for ordinary and sensitive attributes.

## Prerequisite chain

A bind session and network/ACL rights for the requested scope are required. Anonymous, authenticated and signed/channel-bound behavior varies by policy and client.


## Impact limits and failure cases

Search results depend on ACL visibility, GC/referral availability, replication lag, RODC/forest scope and endpoint policy. Readable metadata does not prove a usable secret or privilege path.

## Detection and validation

Monitor directory audit 4662 and LDAP bind/search volumes/sensitive attributes from unusual hosts. Baseline applications and identity inventory tools, and correlate source identity and search scope.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict sensitive attribute read rights, LDAP signing/channel binding and management network access, and monitor anomalous enumeration. For unauthorized collection, preserve bind/search evidence, revoke identities, correct ACLs and assess whether the data enabled later access.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1087.002](https://attack.mitre.org/techniques/T1087/002/)
