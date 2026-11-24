---
id: sharphound
type: tool
label: "SharpHound"
repo: "SpecterOps/SharpHound"
category: "Graph"
---

## Overview

SharpHound is the official C# BloodHound collector for Active Directory.

## High-level capabilities

Collects objects, ACLs, trusts, sessions, GPO relationships, and optional local/domain relationship data for BloodHound.

## Safe authorized assessment and defensive use

Use for authorized graph collection, baseline assessment, tier-boundary review, and remediation planning.

## Prerequisites and operating boundaries

Authorized domain credentials, network reachability, approved collection scope/mode, supported runtime, and secure output.

## Observable behavior and defensive considerations

LDAP/RPC/SMB/DC traffic, authentication, session or host queries, executable/process/file activity, and graph ingestion.

## Limitations

Rights and network filtering determine completeness. Session and local-admin data can be stale and graph findings need validation.

## References

- [Project repository: SharpHound](https://github.com/SpecterOps/SharpHound)
- [BloodHound documentation](https://bloodhound.specterops.io/)
