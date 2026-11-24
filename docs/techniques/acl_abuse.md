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
Use an over-permissioned ACE to reset a password, add group membership, or grant further rights.

## Prerequisite
Control over an AD object via a weak ACE.

## How it works

Active Directory access-control entries (ACEs) grant specific rights over an object or its descendants. A principal that can modify memberships, reset credentials, write an attribute, or change an object's permissions may be able to turn that right into control of a more privileged identity. The effective path depends on inheritance, deny entries, object type, and the exact right—not on a tool's simplified label alone.

## Defensive checks

Review effective permissions on privileged users and groups, domain controllers, GPOs, and service identities. Remove unnecessary write and delegation rights, monitor security-descriptor and group-membership changes, and use change control for privileged objects. Validate remediation by recalculating the full path.

## References

- [MITRE ATT&CK: Account Manipulation](https://attack.mitre.org/techniques/T1098/)
- [Microsoft: Access control and permissions](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-identifiers)
