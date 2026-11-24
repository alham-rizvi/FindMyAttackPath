---
id: trust_enum
type: technique
label: "Domain & forest trust mapping"
phase: "recon"
tools: ["powerview", "netexec"]
cve: null
detect: "Trust-object LDAP queries."
mitre: "T1482"
tag: null
---

# Domain & forest trust mapping

Trust enumeration maps cross-domain/forest relationships, directions and filters. A trust edge describes a relationship boundary, not automatic resource privilege.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Trust objects and attributes (direction/type/transitivity/partner), trust key state, domain/forest SIDs, SID filtering/quarantine, selective authentication and target ACL are central.

## Prerequisite chain

Directory read access and network visibility to the trust/resource are required. Some relationships can be inferred from domain metadata without live resource reachability.


## Impact limits and failure cases

Inbound/outbound direction, forest/domain scope, transitivity, filtering, selective auth and resource ACL determine impact. A stale or unreachable trust is not a live path.

## Detection and validation

Audit trust object reads/changes, cross-realm 4769/4776 and unusual resource access between domains. Baseline identity federation and normal cross-domain administration.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove obsolete trusts and broad transitivity/direction, use selective auth/SID filtering and review resource ACL.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1482](https://attack.mitre.org/techniques/T1482/)
