---
id: bloodhound_collect
type: technique
label: "BloodHound graph collection"
phase: "recon"
tools: ["bloodhound", "sharphound", "bloodhoundpy", "rusthound", "netexec", "goodhound", "improhound"]
cve: null
detect: "Collector execution; large LDAP/SMB session bursts; ZIP creation."
mitre: "T1087 / T1482"
tag: null
---

# BloodHound graph collection

Graph collection converts identity relationships into nodes and edges for authorized attack-path review. Graph output is inventory and hypothesis generation, not exploit confirmation.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Depending on collectors, data comes from LDAP/AD objects, ACLs, group membership, SPNs, GPO links, sessions, local groups, trusts, SMB/RPC, and optionally Entra roles/applications/devices.

## Prerequisite chain

The collector needs the directory/network/API read rights and reachability selected by the written scope. Credentials and tenant integrations limit which objects and edges can be resolved.


## Impact limits and failure cases

Graph completeness varies by collector permissions, RODC/GC behavior, stale sessions, ACL resolution, network segmentation, license/integration coverage, and stale replicas. An edge may describe permission but not a successful operation or protected target.

## Detection and validation

Watch for LDAP/SAMRPC/SMB bursts, session enumeration, collector processes, archive creation and large directory reads from unusual hosts. Compare collection timing with the approved inventory window.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Limit directory/API reads, isolate inventory identities, segment management networks and baseline collectors. If collection was unauthorized, revoke collector credentials, determine data scope, review affected identities, and remove excessive read rights after access review.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1087](https://attack.mitre.org/techniques/T1087/)
- [MITRE ATT&CK: T1482](https://attack.mitre.org/techniques/T1482/)
