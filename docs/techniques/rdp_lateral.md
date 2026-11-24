---
id: rdp_lateral
type: technique
label: "RDP lateral movement & session hijacking"
phase: "lateral"
tools: []
cve: null
detect: "4624 type 10; tscon.exe invocation."
mitre: "T1021.001 / T1563.002"
tag: null
---

# RDP lateral movement & session hijacking

RDP provides interactive remote desktop sessions. Session hijacking is a separate, privilege-dependent Windows-session operation and is not required for normal RDP lateral movement.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

RDP listener/NLA/TLS, Remote Desktop logon rights, account/session type, local session state and tscon/session APIs, firewall and endpoint policy are involved.

## Prerequisite chain

Valid interactive credentials or an authorized access mechanism, RDP reachability and logon rights are required. Hijacking additionally needs compatible host/session privileges and state.


## Impact limits and failure cases

NLA/TLS/MFA, account rights, RDP ACL, session policy, license, network and endpoint controls affect impact. A disconnected session is not necessarily accessible or transferable.

## Detection and validation

Audit 4624 type 10, Terminal Services/RDP logs, 4778/4779, tscon/session process events and 4688 with source account/host. Baseline helpdesk and remote administration.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict RDP by tier/network, require NLA/MFA and least privilege, and monitor session takeover.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1021.001](https://attack.mitre.org/techniques/T1021.001/)
- [MITRE ATT&CK: T1563.002](https://attack.mitre.org/techniques/T1563.002/)
