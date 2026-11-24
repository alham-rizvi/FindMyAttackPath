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
Move interactively via RDP, including taking over another user's disconnected session on a shared host.

## Prerequisite
RDP access, or local admin on a host with a cached session.

## How it works

Remote Desktop provides an interactive logon to a remote Windows host. A user with RDP rights can gain a session there; in a separate scenario, an administrator on a shared host may gain control of another user's existing session. The latter is not a normal consequence of merely having RDP access and should be treated as a distinct, privileged action.

## Defensive checks

Limit RDP to jump hosts and approved administrator groups, require Network Level Authentication and strong multifactor controls where available, and prevent privileged accounts from signing in to ordinary endpoints. Monitor logon type 10, session transitions, source address, and administrative actions performed after connection.

## References

- [MITRE ATT&CK: Remote Desktop Protocol](https://attack.mitre.org/techniques/T1021/001/)
- [MITRE ATT&CK: Windows Remote Management](https://attack.mitre.org/techniques/T1563/002/)
