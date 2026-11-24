---
id: adpeas
type: tool
label: "adPEAS"
repo: "61106960/adPEAS"
category: "Recon"
---

## Overview

adPEAS is a PowerShell Active Directory enumeration and misconfiguration-assessment toolkit.

## High-level capabilities

Domain, group, trust, ACL, GPO, service, certificate, and policy-oriented checks grouped into PowerShell functions.

## Safe authorized assessment and defensive use

Use read-only functions for an authorized AD inventory and control review.

## Prerequisites and operating boundaries

PowerShell on an approved host, domain connectivity, and read access to the objects and attributes selected by each check.

## Observable behavior and defensive considerations

LDAP/DC queries, PowerShell script-block or AMSI events, process execution, and local report-file creation.

## Limitations

Release and permissions determine coverage. Nested groups, effective rights, replication, and compensating controls require manual interpretation.

## References

- [Project repository: adPEAS](https://github.com/61106960/adPEAS)
