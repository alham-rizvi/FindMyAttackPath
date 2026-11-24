---
id: golden
type: technique
label: "Golden ticket"
phase: "persist"
tools: ["mimikatz", "rubeus"]
cve: null
detect: "A 4769 with no matching 4768; a TGT lifetime outside domain policy."
mitre: "T1558.001"
tag: null
---
Forge a TGT for any user using the domain's krbtgt hash, valid until krbtgt is rotated twice.

## Prerequisite
The krbtgt account's hash, via DCSync or an NTDS dump.

## How it works

The krbtgt account key protects Kerberos ticket-granting tickets for a domain. If that key is compromised, a forged TGT may be accepted as a domain identity until the relevant key material is rotated and old tickets have expired. This is domain-wide compromise, not simply a way to bypass one service's password check.

## Defensive checks

Protect replication rights, domain-controller backups, and credential material; monitor unusual ticket lifetimes, identities, and Kerberos activity from unexpected hosts. Recovery requires a planned, staged krbtgt password reset process and validation of replication health—an improvised single reset may not invalidate all forged tickets.

## References

- [MITRE ATT&CK: Golden Ticket](https://attack.mitre.org/techniques/T1558/001/)
- [Microsoft: KRBTGT account password reset guidance](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-reset-the-krbtgt-password)
