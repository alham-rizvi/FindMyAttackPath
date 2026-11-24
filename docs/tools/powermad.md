---
id: powermad
type: tool
label: "Powermad"
repo: "Kevin-Robertson/Powermad"
category: "Privilege Escalation"
---

## Overview

Powermad is a PowerShell module for machine-account and computer-object research.

## High-level capabilities

Inventories or, with rights, creates or modifies computer objects and MachineAccountQuota-related state.

## Authorized red-team assessment and defensive use

Use in a lab or approved domain-change review to verify restrictions on computer-object creation and attributes.

## Prerequisites and operating boundaries

Domain rights matching the read or write test, PowerShell execution, and rollback for object or attribute changes.

## Observable behavior and defensive considerations

LDAP object creation/writes, DC audit, computer lifecycle and join activity, replication, and endpoint join telemetry.

## Limitations

Quota and ACL state differ by domain. Object creation does not prove a downstream delegation or privilege path.

## References

- [Project repository: Powermad](https://github.com/Kevin-Robertson/Powermad)
