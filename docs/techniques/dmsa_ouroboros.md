---
id: dmsa_ouroboros
type: technique
label: "dMSA Ouroboros credential extraction"
phase: "cred"
tools: []
cve: null
detect: "Directory-service access to dMSA attributes."
mitre: "T1003 (variant)"
tag: "new"
---
Abuse a delegated Managed Service Account's self-rotating design on Windows Server 2025 to repeatedly pull its current credential.

## Prerequisite
Rights over a dMSA object on a Server 2025 domain.

## How it works

A delegated Managed Service Account (dMSA) is a directory-managed service identity with credential and migration behavior that differs from a traditional service account. This entry describes a reported abuse pattern in which access to dMSA-related directory state may expose or affect credentials associated with the account. Exact behavior depends on the Windows Server version, migration state, directory permissions, and current vendor guidance; validate those conditions before treating a finding as exploitable.

## Defensive checks

Review who can read or modify dMSA objects and their credential-related attributes, restrict service identities to necessary hosts and rights, and monitor unusual directory reads or changes. Keep domain controllers current and consult Microsoft advisories for the deployed version. Avoid relying on the technique nickname alone as proof of impact.

## References

- [Microsoft: Delegated Managed Service Accounts overview](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/delegated-managed-service-accounts/delegated-managed-service-accounts-overview)
- [MITRE ATT&CK: OS Credential Dumping](https://attack.mitre.org/techniques/T1003/)
