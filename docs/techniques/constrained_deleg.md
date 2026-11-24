---
id: constrained_deleg
type: technique
label: "Constrained delegation abuse (S4U2Self/S4U2Proxy)"
phase: "privesc"
tools: ["rubeus", "impacket"]
cve: null
detect: "4769 showing S4U flags set."
mitre: "T1558"
tag: null
---

# Constrained delegation abuse (S4U2Self/S4U2Proxy)

Constrained delegation lets a configured service account obtain a service ticket on behalf of a user for only explicitly listed SPNs, subject to protocol-transition and account policy.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

The delegating account, `msDS-AllowedToDelegateTo`, SPNs, s4u2self/s4u2proxy, protocol-transition flags, target service principal, user account restrictions and PAC/realm policy are central.

## Prerequisite chain

Control of or an authorized test identity for the delegating account is required, as are matching target SPNs and caller eligibility. The target must accept the delegated identity and authorize the action.


## Impact limits and failure cases

Impact is limited to configured services/SPNs and target authorization. Protected Users, “account is sensitive and cannot be delegated,” realm/encryption policy, target registration and account state may block it.

## Detection and validation

Audit 4769 S4U/service-ticket patterns, 4662 writes to delegation attributes and changes to accounts/SPNs. Correlate source service, target SPN, delegated user and resource action.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove broad SPNs and unnecessary protocol-transition, restrict delegating accounts, mark sensitive accounts not delegatable, prefer resource-based or workload identities where appropriate, and isolate Tier-0 services.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
