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

# WMI / WinRM / SMB remote execution

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**WMI `Win32_Process::Create`** on the target.

## Detection
**4688** with parent `WmiPrvSE.exe`; WMI activity (**5857/5860/5861**); **Sysmon 1/11**.

---

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1047](https://attack.mitre.org/techniques/T1047/)
- [MITRE ATT&CK: T1021.002](https://attack.mitre.org/techniques/T1021/002/)
- [MITRE ATT&CK: T1021.006](https://attack.mitre.org/techniques/T1021/006/)
