---
id: wmi_exec
type: technique
label: "WMI / WinRM / SMB remote execution"
phase: "lateral"
tools: ["impacket", "netexec", "evilwinrm"]
cve: null
detect: "WMI-Activity operational log; 4688; 7045 service creation."
mitre: "T1047 / T1021.002 / T1021.006"
tag: null
---
Run commands on a remote host over WMI, WinRM or SMB using a valid credential or hash.

## Prerequisite
Local admin (or WinRM access) on the target.

## How it works

WMI, WinRM, and SMB are separate remote-management or administration paths that can be used to perform actions on another Windows host. An identity must be authorized for the chosen service, and firewall and service configuration must allow the connection. The resulting activity may be legitimate administration, so context and change records are essential when triaging it.

## Defensive checks

Restrict remote-management access to managed administration hosts and approved groups, segment management networks, and log WMI, WinRM, process creation, and service installation activity. Correlate the source account and device with the destination and maintenance window; alert on unusual remote process or service creation.

## References

- [MITRE ATT&CK: Windows Management Instrumentation](https://attack.mitre.org/techniques/T1047/)
- [MITRE ATT&CK: Remote Services](https://attack.mitre.org/techniques/T1021/)
- [Microsoft: WinRM installation and configuration](https://learn.microsoft.com/windows/win32/winrm/installation-and-configuration-for-windows-remote-management)
