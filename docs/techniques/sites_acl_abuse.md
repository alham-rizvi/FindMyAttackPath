---
id: sites_acl_abuse
type: technique
label: "AD Sites & Services ACL abuse"
phase: "privesc"
tools: ["bloodhound", "powerview", "bloodyad"]
cve: null
detect: "5136 — directory object modified, on a Sites/Subnets/Site-Link container object."
mitre: "T1484.001"
tag: "new"
---

# AD Sites & Services ACL abuse

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Sites container / site-link / subnet objects** in the Configuration partition.

## Detection
**5136** on `CN=Sites,CN=Configuration,DC=...`; baseline Site/subnet ACLs; restrict Sites write to Tier-0.

---

## References

- [Microsoft: Active Directory replication concepts](https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/replication/active-directory-replication-concepts)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1484.001](https://attack.mitre.org/techniques/T1484/001/)
