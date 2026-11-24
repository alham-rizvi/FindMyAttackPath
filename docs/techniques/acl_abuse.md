---
id: acl_abuse
type: technique
label: "ACL abuse (GenericAll / WriteDACL / ForceChangePassword)"
phase: "privesc"
tools: ["bloodyad", "powerview", "impacket"]
cve: null
detect: "5136 — directory object modified."
mitre: "T1222 / T1098"
tag: null
---

# ACL abuse (GenericAll / WriteDACL / ForceChangePassword)

AD object ACLs can grant an identity rights to alter another object or its authentication-related attributes. The abuse hypothesis is about effective access, not merely a visible ACE.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Security descriptors contain owners and DACL/SACL ACEs. Relevant rights include WriteProperty, GenericWrite, GenericAll, WriteDacl, WriteOwner, and group/attribute-specific write. Object type, inheritance, ACE type, group nesting, and target state determine whether a right is usable.

## Prerequisite chain

The principal must have effective write/owner rights and reach a writable DC or management API. The target operation must also be allowed, and protected-group/SDPROP or RODC behavior may block or delay the result.


## Impact limits and failure cases

Inheritance, nested groups, denied ACEs, RODC scope, AdminSDHolder/SDPROP, foreign security principals, and the target attribute can narrow impact. Read/write ACE names do not prove which operation will succeed or that an identity becomes privileged.

## Detection and validation

Use directory audit event 5136 for object changes, privilege/group events 4724/4728/4732/4742 and 4662 as applicable. Correlate actor, target DN, old/new values, source host, group nesting, and replication; baseline delegated helpdesk changes.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove unnecessary write/owner rights and broad groups, replace with documented scoped delegation, review AdminSDHolder and sensitive object ACLs, and separate privileged tiers.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1222](https://attack.mitre.org/techniques/T1222/)
- [MITRE ATT&CK: T1098](https://attack.mitre.org/techniques/T1098/)
