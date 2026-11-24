---
id: kerberoast
type: technique
label: "Kerberoasting"
phase: "initial"
tools: ["rubeus", "impacket", "hashcat"]
cve: null
detect: "4769 requesting RC4 (etype 0x17) for an unusual SPN."
mitre: "T1558.003"
tag: null
---
Request TGS tickets for SPN-bearing accounts and crack the service-account password offline.

## Prerequisite
Any domain user; target has an SPN.
