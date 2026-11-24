---
id: inveigh
type: tool
label: "Inveigh"
repo: "Kevin-Robertson/Inveigh"
category: "Initial Access"
---

## Overview

Inveigh is a .NET and PowerShell framework for legacy name-resolution and authentication-flow research.

## High-level capabilities

LLMNR, NBNS, mDNS, WPAD/HTTP, and related listeners used to study how Windows authentication may leak in local networks.

## Authorized red-team assessment and defensive use

Use only in an isolated segment to test legacy-resolution and relay protections; capture and listener activity require explicit approval.

## Prerequisites and operating boundaries

Written network scope, isolated broadcast/multicast area, controlled listeners, and credential-safe evidence handling.

## Observable behavior and defensive considerations

Name-resolution traffic, listener process activity, DNS/DHCP/network events, SMB/HTTP authentication, EDR, and IDS.

## Limitations

Modern OS settings and segmentation reduce exposure. Captures may be unusable and contain sensitive authentication material.

## References

- [Project repository: Inveigh](https://github.com/Kevin-Robertson/Inveigh)
- [Microsoft Learn: DNS and name resolution](https://learn.microsoft.com/windows-server/networking/dns/dns-overview)
