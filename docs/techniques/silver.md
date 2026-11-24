---
id: silver
type: technique
label: "Silver ticket"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "A 4769 for that service with no prior 4768."
mitre: "T1558.002"
tag: null
---

# Silver ticket

A silver ticket is a service-specific TGS protected by the target service account/computer key, not necessarily issued through a prior AS/TGT exchange.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Target service account/computer key, SPN, TGS/PAC, target host/service validation, ticket lifetime, clock, encryption and target ACL are relevant.

## Prerequisite chain

A valid key for the exact target service and a ticket accepted by that service are required. A ticket for one SPN is not general domain authority.


## Impact limits and failure cases

Service key/account state, PAC validation, clock, host patch, SPN/DNS and target ACL determine usability. Service credential rotation invalidates the old key context.

## Detection and validation

Correlate 4769/KDC-source mismatch or absence with service logon/PAC anomalies and service-account/SPN/key changes. Lack of 4768 alone is insufficient.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Use gMSA/strong service secrets, isolate service keys/SPNs and patch/monitor hosts.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558.002](https://attack.mitre.org/techniques/T1558/002/)
