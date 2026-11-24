---
id: adcs_enum
type: technique
label: "ADCS template & CA enumeration"
phase: "recon"
tools: ["certipy", "certify"]
cve: null
detect: "LDAP reads of pKICertificateTemplate objects."
mitre: "T1649 (precursor)"
tag: null
---
Map certificate templates and CA permissions for ESC-class misconfigurations.

## Prerequisite
Any domain user.
