---
id: lateral
type: phase
label: "Lateral Movement"
---
Use an identity or authentication artifact from one system to access another. Common mechanisms include remote management protocols, interactive remote sessions, or reusing an NTLM hash or Kerberos ticket. The target's authorization and network controls determine what the identity can do; successful authentication does not necessarily mean remote execution is possible.

## Typical progression

```mermaid
flowchart LR
  A[Identity or ticket available] --> B[Target reachable over an allowed protocol]
  B --> C{Identity authorized for the requested action?}
  C -->|No| D[Access denied or limited]
  C -->|Yes| E[Remote logon or service access]
  E --> F[New host becomes a possible pivot]
```

Pass-the-hash, pass-the-ticket, overpass-the-hash, WMI / WinRM / SMB, RDP, and WMI event subscriptions represent different behaviors and leave different evidence. Treat fileless execution as a persistence or execution concern as well as a movement concern.

## Defensive view

Segment administrative tiers, restrict remote-management paths, use Windows Defender Firewall and just-in-time administration, and prevent privileged accounts from signing in to lower-trust hosts. Correlate logon type, source device, account, destination, and process / service creation. Use unique local administrator passwords and review cached or disconnected sessions on shared systems.

## References

- [MITRE ATT&CK: Lateral Movement](https://attack.mitre.org/tactics/TA0008/)
- [MITRE ATT&CK: Remote Services](https://attack.mitre.org/techniques/T1021/)
- [Microsoft: Windows LAPS overview](https://learn.microsoft.com/windows-server/identity/laps/laps-overview)
