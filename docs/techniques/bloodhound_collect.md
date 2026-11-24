---
id: bloodhound_collect
type: technique
label: "BloodHound graph collection"
phase: "recon"
tools: ["bloodhound", "sharphound", "bloodhoundpy", "rusthound", "netexec", "goodhound", "improhound"]
cve: null
detect: "Collector execution; large LDAP/SMB session bursts; ZIP creation."
mitre: "T1087 / T1482"
tag: null
---


# BloodHound graph collection

### Affected object / attribute
**Graph of users, computers, groups, GPOs, trusts, ACLs, ADCS, sessions, containers**.

### Concept (deep)
Collection method matters for OPSEC. `-c All` is comprehensive but noisy; `-c DCOnly,ACL,Trusts,ObjectProps` is stealthier.

### Commands
```bash
