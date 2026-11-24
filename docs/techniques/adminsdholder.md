---
id: adminsdholder
type: technique
label: "AdminSDHolder / SDProp persistence"
phase: "persist"
tools: ["bloodhound", "powerview"]
cve: null
detect: "Audit AdminSDHolder ACL changes and compare protected-account security descriptors before and after SDProp processing."
mitre: "T1098"
tag: null
---

# AdminSDHolder / SDProp persistence

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`CN=AdminSDHolder,CN=System,DC=...`** — `nTSecurityDescriptor`.

## Impact
**Persistent domain-wide privilege** on every protected account.

## Detection and defensive measures
**5136** on `CN=AdminSDHolder`; compare `adminCount=1` objects’ ACLs against baseline; alert on SDProp ACL drift.

---

## References

- [Microsoft: Protected accounts and groups in Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/appendix-c--protected-accounts-and-groups-in-active-directory)
- [MITRE ATT&CK: Account Manipulation](https://attack.mitre.org/techniques/T1098/)
