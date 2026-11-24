---
id: wmi_exec
type: technique
label: "WMI / WinRM / SMB remote execution"
phase: "lateral"
tools: ["impacket", "netexec", "evilwinrm"]
cve: null
detect: "WMI-Activity operational log; 4688; 7045 service creation."
mitre: "T1021.002 / T1021.006"
tag: null
---
Run commands on a remote host over WMI, WinRM or SMB using a valid credential or hash.

## Prerequisite
Local admin (or WinRM access) on the target.
