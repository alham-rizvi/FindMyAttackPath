---
id: bloodyad
type: tool
label: "bloodyAD"
repo: "CravateRouge/bloodyAD"
category: "Privilege Escalation"
---

## Overview

bloodyAD is a Python LDAP/AD object and attribute administration utility.

## High-level capabilities

Directory inspection and, when explicitly authorized, modification of users, computers, groups, trusts, and ACL-related attributes.

## Safe authorized assessment and defensive use

Use for controlled lab change exercises or authorized administration. Any write is change-management work, not routine enumeration.

## Prerequisites and operating boundaries

LDAP or LDAPS, an approved target, suitable object and attribute permissions, and a rollback plan.

## Observable behavior and defensive considerations

LDAP bind/write operations, DC audit events, replication, object lifecycle records, and source-account telemetry.

## Limitations

Success depends on inherited ACLs, object class, schema, replication, and LDAP policy. A write may not be fully effective across replicas immediately.

## References

- [Project repository: bloodyAD](https://github.com/CravateRouge/bloodyAD)
