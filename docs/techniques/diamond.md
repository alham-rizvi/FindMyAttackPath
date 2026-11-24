---
id: diamond
type: technique
label: "Diamond ticket"
phase: "persist"
tools: ["rubeus"]
cve: null
detect: "Subtle, hard-to-spot field inconsistencies on an otherwise valid TGT."
mitre: "T1558.001"
tag: "new"
---

# Diamond ticket

A diamond ticket concept modifies or reissues data from a valid ticket context instead of constructing every ticket component independently.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

TGT/PAC fields, KRBTGT/KDC signing and encryption context, ticket metadata, key versions, realm/domain policy, clocks and service-ticket validation are involved.

## Prerequisite chain

A valid ticket context and the cryptographic/KDC ability required to produce or re-protect a ticket must exist. The target KDC/service must accept the modified authorization fields.


## Impact limits and failure cases

PAC validation, ticket protection, domain/forest/KDC version, key state, clock, lifetime and service-side checks vary. A syntactically valid or exportable ticket is not proof that modified authorization is accepted.

## Detection and validation

Correlate abnormal PAC/ticket fields or lifetimes with an issuing 4768/KDC, source host and subsequent service access. Coverage is limited by Windows and PAC validation versions.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Patch/KDC hosts, protect KRBTGT and DC administration, monitor ticket/PAC anomalies and restrict DC replication rights. Suspected compromise follows a staged krbtgt recovery plan, session review and ticket/repository validation.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558.001](https://attack.mitre.org/techniques/T1558.001/)
