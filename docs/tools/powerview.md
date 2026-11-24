---
id: powerview
type: tool
label: "PowerSploit"
repo: "PowerShellMafia/PowerSploit"
category: "Recon"
---

## Overview

PowerView is a PowerShell Active Directory enumeration and relationship-analysis module in PowerSploit.

## High-level capabilities

Domain, user, group, computer, trust, GPO, session, share, and ACL relationship queries.

## Safe authorized assessment and defensive use

Use read-only functions for authorized AD inventory and effective-rights review.

## Prerequisites and operating boundaries

PowerShell, domain visibility, valid account, and LDAP/RPC/SMB read access.

## Observable behavior and defensive considerations

LDAP/RPC/SMB traffic, DC authentication, PowerShell script-block/AMSI events, and process/file activity.

## Limitations

Legacy code may conflict with modern endpoint controls. Results reflect account rights and may miss effective ACL or recent-state context.

## References

- [Project repository: PowerSploit](https://github.com/PowerShellMafia/PowerSploit)
