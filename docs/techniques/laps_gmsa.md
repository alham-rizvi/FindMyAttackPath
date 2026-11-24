---
id: laps_gmsa
type: technique
label: "LAPS / gMSA readable-password discovery"
phase: "recon"
tools: ["lapstoolkit", "powerview"]
cve: null
detect: "LDAP reads of ms-Mcs-AdmPwd or msDS-ManagedPassword."
mitre: "T1552"
tag: null
---
Find computers or service accounts whose managed password you already have read rights to.

## Prerequisite
ReadLAPSPassword or ReadGMSAPassword rights on the object.
