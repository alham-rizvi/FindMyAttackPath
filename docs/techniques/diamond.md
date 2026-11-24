---
id: diamond
type: technique
label: "Diamond ticket"
phase: "persist"
tools: ["rubeus"]
cve: null
detect: "Subtle, hard-to-spot field inconsistencies on an otherwise valid TGT."
mitre: "T1558.001"
tag: "new"
---
Modify the fields of a legitimately-issued TGT in place rather than forging one from scratch, evading golden-ticket anomaly detection.

## Prerequisite
The krbtgt hash plus a genuine TGT to modify.

## How it works

A Diamond Ticket is a forged or modified ticket derived from a legitimately issued TGT and protected using the domain's krbtgt key. Because it retains more characteristics of a normal ticket than a ticket built from scratch, simple anomaly checks may miss it. Possession of the krbtgt secret is still the decisive prerequisite, and the activity represents a serious domain compromise.

## Defensive checks

Treat the krbtgt key as a Tier-0 secret, restrict replication access, and use multiple signals to assess ticket validity: account state, issuance history, device, timing, lifetime, and service behavior. Do not rely on one ticket-field heuristic; follow domain recovery procedures if the key may be exposed.

## References

- [MITRE ATT&CK: Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
- [Microsoft: KRBTGT account password reset guidance](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)
