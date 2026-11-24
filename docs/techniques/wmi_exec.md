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

WMI/WinRM/SMB remote management can create CIM sessions, processes or services. The protocols and authorization boundaries are distinct and should be validated separately.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

WMI namespace/provider/DCOM ACL, WinRM listener/HTTP(S), SMB/DCOM, account logon/token, remote-UAC, process/service logs, firewall and endpoint policy are relevant.

## Prerequisite chain

Valid remote credentials/token, protocol reachability and local rights to the listener/namespace/provider/action are required.


## Impact limits and failure cases

Remote UAC, listener/auth, namespace/provider ACL, DCOM/SMB policy, account type, token integrity and endpoint controls determine process/service privilege. Protocol success is not automatic execution privilege.

## Detection and validation

Correlate WMI-Activity, 4688 process, 7045 service, 4624 type 3/logon and WinRM logs with account/source and target action.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict management protocols and sources, use JEA/WinRM ACL, tier administration and endpoint control.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1047](https://attack.mitre.org/techniques/T1047/)
- [MITRE ATT&CK: T1021.002](https://attack.mitre.org/techniques/T1021.002/)
- [MITRE ATT&CK: T1021.006](https://attack.mitre.org/techniques/T1021.006/)
