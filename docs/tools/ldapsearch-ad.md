---
id: ldapsearch-ad
type: tool
label: "ldapsearch-ad"
repo: "yaap7/ldapsearch-ad"
category: "Recon"
---

## Overview

ldapsearch-ad is a Python LDAP wrapper designed for common Active Directory searches.

## High-level capabilities

Filters and attribute retrieval for users, computers, groups, trusts, service accounts, privilege groups, and other directory objects.

## Safe authorized assessment and defensive use

Use repeatable read-only searches for domain inventory or finding reproduction under authorization.

## Prerequisites and operating boundaries

LDAP or LDAPS, authorized credentials, read rights, and an appropriate search base/schema.

## Observable behavior and defensive considerations

LDAP bind/search volume, DC logs, network monitoring, and workstation process/file telemetry.

## Limitations

Completeness depends on account rights and replicas. An LDAP hit is not evidence of effective ACL or exploitability.

## References

- [Project repository: ldapsearch-ad](https://github.com/yaap7/ldapsearch-ad)
