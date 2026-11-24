---
id: cname_relay
type: technique
label: "Kerberos CNAME-abuse relay to ADCS (ESC8)"
phase: "initial"
tools: ["impacket"]
cve: null
detect: "Unexpected DNS CNAME changes; certificate issuance outside normal workflow."
mitre: "T1649"
tag: "new"
---
Plant a DNS CNAME to redirect ticket requests, relaying the resulting authentication into AD CS web enrollment.

## Prerequisite
DNS write access and a reachable ESC8-vulnerable CA.
