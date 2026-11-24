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
Enumerate users, groups, ACLs, GPOs and trust data directly over LDAP.

## Prerequisite
Any authenticated domain user.
