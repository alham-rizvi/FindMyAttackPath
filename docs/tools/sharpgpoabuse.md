---
id: sharpgpoabuse
type: tool
label: "SharpGPOAbuse"
repo: "FSecureLABS/SharpGPOAbuse"
category: "Privilege Escalation"
---

## Overview

SharpGPOAbuse is a C# proof-of-concept for testing misuse of GPO write rights.

## High-level capabilities

Demonstrates how GPO write access can create supported policy elements such as scheduled-task or other configured actions.

## Safe authorized assessment and defensive use

Use only in an isolated lab to validate GPO ACL restrictions and endpoint detections.

## Prerequisites and operating boundaries

GPO/SYSVOL write rights in the test domain, test endpoints, and rollback procedures.

## Observable behavior and defensive considerations

GPO/SYSVOL writes, DC LDAP audit, policy replication and refresh, task/service creation, and EDR.

## Limitations

Replication, precedence, membership, OS context, and policy blockers affect results. Write rights do not reach every host.

## References

- [Project repository: SharpGPOAbuse](https://github.com/FSecureLABS/SharpGPOAbuse)
- [Microsoft Learn: Group Policy](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-groups)
