---
id: mitm6
type: tool
label: "mitm6"
repo: "dirkjanm/mitm6"
category: "Coercion"
---

## Overview

mitm6 is an IPv6/DNS relay-preparation and network exposure research tool.

## High-level capabilities

Observes IPv6 state and can advertise IPv6/DHCPv6 and DNS configuration for testing whether legacy DNS/WPAD and relay controls are effective.

## Authorized red-team assessment and defensive use

Use only in an isolated VLAN or written network assessment with controlled relay infrastructure.

## Prerequisites and operating boundaries

Network authorization, VLAN isolation, test clients, controlled relay host, and rollback coordination.

## Observable behavior and defensive considerations

Router advertisements, DHCPv6, DNS/WPAD traffic, IPv6 assignment, authentication, EDR, and network IDS.

## Limitations

Behavior varies across clients and operating systems. DNS configuration alone does not prove credential or privilege compromise and can disrupt hosts.

## References

- [Project repository: mitm6](https://github.com/dirkjanm/mitm6)
- [Microsoft Open Specifications](https://learn.microsoft.com/openspecs/windows_protocols/)
