---
id: rbcd
type: technique
label: "Resource-Based Constrained Delegation (RBCD)"
phase: "privesc"
tools: ["impacket", "rubeus", "rbcdpy", "powermad"]
cve: null
detect: "Attribute write on msDS-AllowedToActOnBehalfOfOtherIdentity."
mitre: "T1558"
tag: "new"
---

# Resource-Based Constrained Delegation (RBCD)

Resource-Based Constrained Delegation is an ACL on a target computer that names identities allowed to obtain delegated access to that resource.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Target computer object and `msDS-AllowedToActOnBehalfOfOtherIdentity`, controlled account, S4U2Proxy, target SPN/DNS, machine-account state and target resource ACL are relevant.

## Prerequisite chain

Write/control rights to the target attribute and a controlled account usable in S4U are required. The target must accept the resulting service ticket and authorize the action.


## Impact limits and failure cases

Attribute semantics, target OS/KDC, account type/control, machine-account policy, SPN/DNS and target ACL vary. Writing the attribute is not automatic privilege.

## Detection and validation

Audit 5136/4662 writes to the RBCD attribute, computer changes, S4U/4769 and target service access from unexpected identities.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove broad computer-object write rights, restrict machine/delegation administration and monitor RBCD attributes.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
