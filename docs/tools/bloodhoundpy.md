---
id: bloodhoundpy
type: tool
label: "BloodHound.py"
repo: "dirkjanm/BloodHound.py"
category: "Graph"
---

## Overview

BloodHound.py is a Python BloodHound-compatible Active Directory collector.

## High-level capabilities

LDAP and supporting protocol collection for users, computers, groups, trusts, sessions, ACLs, GPOs, and relationships supported by its release.

## Safe authorized assessment and defensive use

Use for authorized graph collection on Linux or other supported Python environments.

## Prerequisites and operating boundaries

Domain credentials or supported authentication context, Python runtime, network access to LDAP/RPC/SMB services, and secure output storage.

## Observable behavior and defensive considerations

LDAP/RPC/SMB/DC authentication and searches, Python process activity, network telemetry, and JSON output-file access.

## Limitations

Coverage depends on permissions and network filtering. Schema parity and stale collection can affect graph accuracy.

## References

- [Project repository: BloodHound.py](https://github.com/dirkjanm/BloodHound.py)
- [BloodHound documentation](https://bloodhound.specterops.io/)
