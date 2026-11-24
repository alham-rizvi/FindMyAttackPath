---
id: rbcdpy
type: tool
label: "rbcd-attack"
repo: "tothi/rbcd-attack"
category: "Privilege Escalation"
---

## Overview

rbcd-attack is a Python resource-based constrained delegation research script.

## High-level capabilities

Inspects and, with rights, modifies delegation attributes on test service resources and examines the resulting RBCD relationship.

## Authorized red-team assessment and defensive use

Use only in an isolated lab or authorized access-control assessment.

## Prerequisites and operating boundaries

Rights to modify test objects, domain connectivity, test services and identities, and rollback.

## Observable behavior and defensive considerations

LDAP ACL/attribute writes, DC audit/replication, KDC tickets, service logons, and endpoint logs.

## Limitations

Usability depends on SPNs, account state, protocol support, and KDC policy. Configuration alone does not prove end-to-end access.

## References

- [Project repository: rbcd-attack](https://github.com/tothi/rbcd-attack)
- [Microsoft Learn: Kerberos authentication](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
