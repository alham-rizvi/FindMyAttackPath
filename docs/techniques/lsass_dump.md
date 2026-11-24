---
id: lsass_dump
type: technique
label: "LSASS memory dumping"
phase: "cred"
tools: ["mimikatz"]
cve: null
detect: "Sysmon EID 10 — process access to lsass.exe."
mitre: "T1003.001"
tag: null
---
Pull plaintext passwords, NTLM hashes and Kerberos keys out of the LSASS process.

## Prerequisite
Local admin or SeDebugPrivilege.
