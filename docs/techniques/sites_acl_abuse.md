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

### Affected object / attribute
**Sites container / site-link / subnet objects** in the Configuration partition.

### Concept (deep)
Write access lets an attacker **remap client subnets** to a site or alter **site links**, steering **DC locator** and replication behaviour — enabling auth redirection to an attacker-preferred DC or disrupting replication. **Emerging in the PR — document the exact edge once confirmed.**

### Detection
**5136** on `CN=Sites,CN=Configuration,DC=...`; baseline Site/subnet ACLs; restrict Sites write to Tier-0.

---
