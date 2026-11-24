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
Find where privileged users are logged on and which shares hold sensitive files.

## Prerequisite
A foothold or valid credentials.

## How it works

Remote session and share metadata can reveal which accounts are active on which hosts and where files are exposed. An attacker may use that information to prioritize systems holding privileged sessions or sensitive data. This is discovery, not credential theft by itself; impact depends on the permissions of the account and the exposure of the identified resources.

## Defensive checks

Use SMB share permissions and endpoint inventory to limit unnecessary exposure. Audit access to sensitive shares, investigate unusual fan-out across many hosts, and avoid placing privileged users' interactive sessions on lower-trust systems. Session-enumeration telemetry varies by operating system and server configuration.

## References

- [MITRE ATT&CK: Network Share Discovery](https://attack.mitre.org/techniques/T1135/)
- [MITRE ATT&CK: System Network Connections Discovery](https://attack.mitre.org/techniques/T1049/)
