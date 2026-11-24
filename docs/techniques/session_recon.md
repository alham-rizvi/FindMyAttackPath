---
id: session_recon
type: technique
label: "Session & share reconnaissance"
phase: "recon"
tools: ["sauroneye", "snaffler", "netexec"]
cve: null
detect: "NetSessionEnum calls; 5140/5145 share-access events."
mitre: "T1135 / T1049"
tag: null
---

# Session & share reconnaissance

Session/share reconnaissance identifies active SMB sessions and shares, potentially revealing where accounts or resources exist. It does not prove data sensitivity or credential possession.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

NetSessionEnum/NetShareEnum, SMB server, share ACL, DFS, source IP/account, 5140/5145 and endpoint/network visibility are involved.

## Prerequisite chain

Network/RPC/SMB reachability and account rights that permit the enumeration are required. Local policy and firewall determine visibility.


## Impact limits and failure cases

Session churn, share ACL, SMB/RPC policy, firewall, DFS, endpoint visibility and account privilege make results incomplete. A reachable share may not expose sensitive data or usable credentials.

## Detection and validation

Audit NetSessionEnum/share enumeration and 5140/5145 access, correlate source account/host and repeated admin/DFS/share discovery. Baseline approved inventory tools.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict SMB/RPC enumeration and share exposure, tighten share/DFS ACL and segment networks.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1135](https://attack.mitre.org/techniques/T1135/)
- [MITRE ATT&CK: T1049](https://attack.mitre.org/techniques/T1049/)
