---
id: windapsearch
type: tool
label: "windapsearch"
repo: "ropnop/windapsearch"
category: "Recon"
---

## Overview

windapsearch is an LDAP enumeration utility for Active Directory.

## High-level capabilities

LDAP searches for users, groups, computers, service principals, privileged groups, and common directory patterns.

## Safe authorized assessment and defensive use

Use read-only searches for domain inventory and specific object or permission findings under authorization.

## Prerequisites and operating boundaries

Authorized domain credentials, LDAP or LDAPS access, and read rights for selected objects and attributes.

## Observable behavior and defensive considerations

LDAP bind/search traffic, DC audit/network telemetry, and workstation process/file activity.

## Limitations

Completeness depends on filters, permissions, schema, and replicas. LDAP visibility does not establish effective privilege or exploitability.

## References

- [Project repository: windapsearch](https://github.com/ropnop/windapsearch)
