---
id: asreproast
type: technique
label: "AS-REP roasting"
phase: "initial"
tools: ["rubeus", "impacket", "hashcat"]
cve: null
detect: "4768 with pre-authentication disabled."
mitre: "T1558.004"
tag: null
---
Request an AS-REP for accounts with Kerberos pre-auth disabled and crack it offline.

## Prerequisite
At least one account with pre-auth disabled.
