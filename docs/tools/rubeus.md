---
id: rubeus
type: tool
label: "Rubeus"
repo: "GhostPack/Rubeus"
category: "Kerberos"
---

## Overview

Rubeus is a C# Kerberos ticket and authentication research suite.

## High-level capabilities

Ticket request/renewal/cache operations, roasting, S4U/delegation, PAC/certificate, and ticket-cache workflows.

## Safe authorized assessment and defensive use

Use for authorized lab validation and incident analysis of Kerberos configuration and ticket behavior.

## Prerequisites and operating boundaries

Approved Windows host and identity, domain/KDC reachability, and separately authorized test credentials or tickets.

## Observable behavior and defensive considerations

AS/TGS requests, DC/KDC logs, ticket-cache/process activity, service logons, PAC/certificate material, and EDR.

## Limitations

Depends on AES/RC4, PAC and encryption policy, SPNs, clocks, patch level, and EDR. Ticket issuance does not prove lateral movement or privilege.

## References

- [Project repository: Rubeus](https://github.com/GhostPack/Rubeus)
- [Microsoft Learn: Kerberos authentication](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
