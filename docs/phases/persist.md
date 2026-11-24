---
id: persist
type: phase
label: "Domain Persistence & Dominance"
---
Maintain access after the original foothold is removed, often by changing directory state, retaining privileged authentication material, or establishing an alternate trust or credential path. Persistence mechanisms differ in durability and detectability. Some changes are visible in directory or certificate records; others depend on secrets that can survive password changes until sessions, keys, or trust material are also invalidated.

## Why recovery is more than a password reset

An incident response must identify what was changed and which secrets may have been exposed. Ticket-forging material, service keys, certificates, SID history, replication rights, rogue directory registrations, and modified authentication components call for different containment steps. Rebuilding trust in a domain can require coordinated key rotation and staged validation, not a single account reset.

```mermaid
flowchart LR
  A[Privileged access or secret] --> B[Create alternate trust or authentication path]
  B --> C[Access survives ordinary credential change]
  C --> D[Detect directory, certificate, or host change]
  D --> E[Remove persistence and rotate affected secrets]
  E --> F[Validate domain recovery]
```

The graph covers DCSync, forged or modified Kerberos tickets, Skeleton Key, Golden Certificate, DCShadow, SID history, and cross-forest trust tickets. These are high-impact scenarios; the listed prerequisites are intentionally strong.

## Defensive view

Protect and monitor replication permissions, domain-controller memory and configuration, certificate-authority private keys, privileged group membership, and trust settings. Maintain secure backups and a tested recovery plan. During response, preserve evidence and coordinate containment with identity administrators to avoid disrupting replication or invalidating dependencies prematurely.

## References

- [MITRE ATT&CK: Persistence](https://attack.mitre.org/tactics/TA0003/)
- [MITRE ATT&CK: Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
- [Microsoft: AD forest recovery guide](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-guide)
