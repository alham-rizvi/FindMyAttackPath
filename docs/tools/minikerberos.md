---
id: minikerberos
type: tool
label: "minikerberos"
repo: "skelsec/minikerberos"
category: "Kerberos"
---

## Overview

minikerberos is a Python library for Kerberos protocol and ticket workflows.

## High-level capabilities

AS, TGS, SPN, ticket, key, delegation, and PKINIT-oriented operations for custom authorized clients or analysis tools.

## Safe authorized assessment and defensive use

Use for lab interoperability, protocol tests, incident-response utilities, or defensive automation.

## Prerequisites and operating boundaries

Python environment, authorized identities and services, reachable KDCs, synchronized clocks, and compatible key/crypto settings.

## Observable behavior and defensive considerations

KDC AS/TGS traffic, service logons, ticket material, and application process/network telemetry.

## Limitations

A protocol library, not an impact classifier. Ticket and key support varies with clocks, SPNs, encryption, and KDC policy.

## References

- [Project repository: minikerberos](https://github.com/skelsec/minikerberos)
- [Microsoft Learn: Kerberos authentication](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
