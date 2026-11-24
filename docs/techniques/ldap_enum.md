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

## How it works

LDAP exposes directory objects through queries. A user with ordinary read access can often inventory identities, group memberships, computer properties, policy links, and some permission data. The security issue is usually not the read itself, but what an attacker can infer from it and whether the resulting relationships lead to a weakly protected object.

## Defensive checks

Review which attributes and objects are readable by broad principals, especially where they contain secrets or operationally sensitive information. Baseline LDAP query volume and investigate unusual query bursts or access from unexpected endpoints; ordinary directory lookups are common, so interpret them with identity and host context.

## References

- [MITRE ATT&CK: Account Discovery](https://attack.mitre.org/techniques/T1087/002/)
- [Microsoft: Active Directory Domain Services overview](https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
