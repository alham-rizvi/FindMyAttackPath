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

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`nTSecurityDescriptor`** on any AD object: domain root, users, computers, groups, OUs, GPOs, AdminSDHolder.

## Impact
- **Ranked escalation to Domain Admin** via the shortest ACL path.
- **Persistence** via AdminSDHolder or SID History.

## Detection and defensive measures
- **5136** (`nTSecurityDescriptor` modified) on domain root, AdminSDHolder, and sensitive OUs.
- **4728/4732** group membership changes.
- **Baseline ACLs**; remove unnecessary `WriteDacl`/`GenericAll` from non-tier-0 principals.
- **Alert** on AdminSDHolder/domain-root ACL edits (Event 4662 with `WriteDacl`).

---
