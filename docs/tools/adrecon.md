---
id: adrecon
type: tool
label: "ADRecon"
repo: "adrecon/ADRecon"
category: "Recon"
---

## Overview

ADRecon is a PowerShell-based Active Directory inventory and reporting utility.

## High-level capabilities

Structured reports for users, groups, computers, trusts, GPOs, ACLs, and other implemented directory areas.

## Authorized red-team assessment and defensive use

Use for authorized baseline collection, evidence preservation, and remediation planning.

## Prerequisites and operating boundaries

An approved Windows/PowerShell host, domain read access, required modules, and secure report storage.

## Observable behavior and defensive considerations

LDAP/DC traffic, PowerShell telemetry, local file creation, and any RPC/SMB lookups used by report modules.

## Limitations

Reports are point-in-time snapshots. Permissions and replication limit completeness and do not establish effective exploitability.

## References

- [Project repository: ADRecon](https://github.com/adrecon/ADRecon)
