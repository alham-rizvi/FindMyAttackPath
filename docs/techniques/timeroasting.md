---
id: timeroasting
type: technique
label: "Timeroasting"
phase: "cred"
tools: ["timeroast", "hashcat"]
cve: null
detect: "Anomalous NTP/MS-SNTP query volume against a DC."
mitre: "T1110"
tag: "new"
---
Request MS-SNTP time responses to recover crackable machine-account hashes without any domain authentication at all.

## Prerequisite
Network reachability to a domain controller.
