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

## Objects and defensive configuration

```text
Object: AdminSDHolder, protected accounts, privileged groups, and directory ACLs
Risky state: Unapproved owner, DACL, membership, delegation, or SID-history changes
Defensive target: Known-good baselines and narrowly controlled Tier-0 administration
Fix: Restore verified state and confirm protected-object processing has completed

Object: krbtgt/service-account keys, CA private keys, and forest-trust secrets
Risky state: Suspected exposure, unmanaged copies, or stale trust credentials
Defensive target: Protected key storage and vendor-approved, dependency-aware rotation
Fix: Preserve evidence and use the relevant forest/PKI recovery procedure

Object: Certificates, tickets, cloud sessions, and host persistence
Risky state: Active artifacts or unauthorized state survives a password reset
Defensive target: Revocation/session containment plus a clean host and directory baseline
Fix: Revoke or expire affected artifacts and verify that old paths no longer work
```

## References

- [MITRE ATT&CK: Persistence](https://attack.mitre.org/tactics/TA0003/)
- [MITRE ATT&CK: Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
- [Microsoft: AD forest recovery guide](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-guide)

## Persistence artifact classes

| Artifact class | Examples | Recovery focus |
| --- | --- | --- |
| Directory state | Group membership, ACLs, SID history, delegation, rogue directory registrations | Compare with approved baselines and audit records; remove unauthorized changes |
| Authentication keys | krbtgt or service-account secrets, CA private keys, trust secrets | Rotate or revoke using a dependency-aware vendor procedure |
| Host state | Modified authentication components, services, WMI subscriptions, scheduled policy | Preserve evidence, rebuild or restore trusted systems where needed |
| Issued credentials | Certificates, Kerberos tickets, cloud sessions | Revoke or expire artifacts and review relying systems |

## Recovery sequence

Contain the affected identity and systems, preserve forensic evidence, identify all persistence paths, and coordinate key or credential rotation with service owners. Remove only confirmed unauthorized changes; careless deletion of replication, CA, or policy state can interrupt legitimate operations. Verify recovery from a known-good baseline and continue monitoring for reappearance or use of old credentials.

For domain-wide key exposure, follow Microsoft's forest-recovery and key-reset guidance exactly. Do not assume that one password reset invalidates all existing sessions, certificates, or tickets. Document which secrets were rotated, which systems received the change, and what evidence demonstrates that the old path is no longer usable.
