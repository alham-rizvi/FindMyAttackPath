---
id: trust_enum
type: technique
label: "Domain & forest trust mapping"
phase: "recon"
tools: ["powerview", "netexec"]
cve: null
detect: "Trust-object LDAP queries."
mitre: "T1482"
tag: null
---
Enumerate trust direction, transitivity and SID filtering to reveal cross-domain paths.

## Prerequisite
Any domain user.
