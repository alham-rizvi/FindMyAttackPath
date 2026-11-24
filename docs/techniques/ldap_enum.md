---
id: ldap_enum
type: technique
label: "LDAP / ADSI enumeration"
phase: "recon"
tools: ["powerview", "adrecon", "adpeas", "adcollector", "ldapsearch-ad", "windapsearch", "adsearch"]
cve: null
detect: "Directory Service Access (4662); elevated LDAP query volume."
mitre: "T1087.002"
tag: null
---


# LDAP / ADSI enumeration

### Affected object / attribute
**LDAP directory** — users, groups, computers, SPNs, trusts, GPOs, ACLs.

### Concept (deep)
LDAP is the AD API. Unauthenticated (if allowed) or low-priv enumeration feeds every other attack.

### Exhaustive commands
```bash
