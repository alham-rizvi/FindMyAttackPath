---
id: gpoddity
type: tool
label: "GPOddity"
repo: "Mr-Un1k0d3r/GPOddity"
category: "Privilege Escalation"
---

## Overview

GPOddity is a proof-of-concept for GPO and authentication-abuse research.

## High-level capabilities

Explores writable GPO paths and how policy or authentication behavior can be induced in a lab domain.

## Authorized red-team assessment and defensive use

Use only to validate GPO ACLs and detection in an isolated domain with an approved rollback.

## Prerequisites and operating boundaries

Test GPO/SYSVOL write rights, lab endpoints, and controlled policy replication and refresh.

## Observable behavior and defensive considerations

GPO/SYSVOL writes, LDAP audit, policy replication and client refresh, service or task creation, and EDR.

## Limitations

Refresh, precedence, membership, OS context, and endpoint policy affect outcomes. A writable GPO does not reach every host.

## References

- [Project repository: GPOddity](https://github.com/synacktiv/GPOddity)
- [Microsoft Learn: Group Policy](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-groups)
