---
id: laps_gmsa
type: technique
label: "LAPS / gMSA readable-password discovery"
phase: "recon"
tools: ["lapstoolkit", "powerview"]
cve: null
detect: "LDAP reads of ms-Mcs-AdmPwd or msDS-ManagedPassword."
mitre: "T1552"
tag: null
---
Find computers or service accounts whose managed password you already have read rights to.

## Prerequisite
ReadLAPSPassword or ReadGMSAPassword rights on the object.

## How it works

LAPS and group Managed Service Accounts are designed to store and rotate credentials in Active Directory. Delegated read rights can expose the current managed secret to approved principals; abuse occurs when those rights are broader than intended and the account has useful access elsewhere. Reading a managed password should be treated as credential exposure, even when rotation is automatic.

## Defensive checks

Review the effective ACLs on password-bearing attributes and the groups allowed to retrieve them. Enable auditing for sensitive directory reads where supported, monitor retrievals from unexpected users or hosts, and verify that managed accounts have only the minimum required privileges.

## References

- [Microsoft: Windows LAPS overview](https://learn.microsoft.com/windows-server/identity/laps/laps-overview)
- [Microsoft: Group Managed Service Accounts overview](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview)
