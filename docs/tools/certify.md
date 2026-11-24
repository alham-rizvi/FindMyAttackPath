---
id: certify
type: tool
label: "Certify"
repo: "GhostPack/Certify"
category: "ADCS"
---

## Overview

Certify is a C# utility for Active Directory Certificate Services enumeration and assessment.

## High-level capabilities

Lists enterprise CAs and published templates, template attributes, EKUs, enrollment-related permissions, and AD CS configuration for analyst review.

## Authorized red-team assessment and defensive use

Use read-only discovery to document CA-template relationships and issuance controls. Certificate requests or authentication require separate approval and a lab.

## Prerequisites and operating boundaries

Authorized AD read access and network reachability to AD CS configuration; module-specific enrollment or HTTP/RPC access for non-read-only tests.

## Observable behavior and defensive considerations

LDAP CA/template reads, enrollment endpoint traffic, CA issuance records, certificate authentication, and workstation process/network activity.

## Limitations

An ESC label or permissive setting is not proof of impact. Effective ACLs, CA policy, trust, EKU, mapping, and enrollment approvals must be reviewed together.

## References

- [Project repository: Certify](https://github.com/GhostPack/Certify)
- [Microsoft Learn: Active Directory Certificate Services](https://learn.microsoft.com/windows-server/identity/ad-cs/)
