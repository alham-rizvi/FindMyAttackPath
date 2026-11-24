---
id: golden
type: technique
label: "Golden ticket"
phase: "persist"
tools: ["mimikatz", "rubeus"]
cve: null
detect: "A 4769 with no matching 4768; a TGT lifetime outside domain policy."
mitre: "T1558.001"
tag: null
---

# Golden ticket

A golden ticket is a TGT protected using KRBTGT key material or an equivalent KDC context. The result can represent a domain identity and authorization context outside ordinary AS issuance.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

KRBTGT account and key versions, KDC/DC, domain SID, TGT/PAC, ticket lifetime, clocks, account/SID fields and domain/forest scope are decisive.

## Prerequisite chain

The cryptographic KRBTGT context for the domain and a ticket accepted by DC/services are required. Old/current key state and ticket validation scope determine whether the ticket is accepted.


## Impact limits and failure cases

Domain scope, old/new KRBTGT keys, DC replication, clocks, account state, PAC validation and RODC/trust boundaries vary. Ticket lifetime or cryptographic success does not prove every resource is accessible.

## Detection and validation

Look for 4768/4769 inconsistencies, TGT use without a matching AS exchange, abnormal lifetime/PAC/client fields and unexpected DC/source hosts. Correlate KDC/DC integrity and account use.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Protect KRBTGT and DC administration, restrict replication rights and tier KDC access. Incident recovery follows Microsoft’s staged krbtgt rotation/recovery plan, waits for replication, and reviews sessions/tickets and affected secrets.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1558.001](https://attack.mitre.org/techniques/T1558.001/)
