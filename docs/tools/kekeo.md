---
id: kekeo
type: tool
label: "kekeo"
repo: "gentilkiwi/kekeo"
category: "Kerberos"
---

## Overview

Kekeo is a Windows Kerberos security research toolkit.

## High-level capabilities

Ticket, AS/TGS, PKINIT/certificate, and low-level Kerberos protocol workflows for lab interoperability and analysis.

## Authorized red-team assessment and defensive use

Use for authorized Kerberos lab testing or incident analysis of relevant ticket and certificate flows.

## Prerequisites and operating boundaries

Compatible domain/KDC, approved identities, synchronized clocks, test certificates or keys, and isolated hosts.

## Observable behavior and defensive considerations

KDC/DC authentication records, ticket operations, service logons, certificate authentication, and endpoint ticket/process telemetry.

## Limitations

Modern PAC, encryption, SPN, clock, and policy settings affect behavior. Ticket issuance alone does not prove broad privilege.

## References

- [Project repository: kekeo](https://github.com/gentilkiwi/kekeo)
- [Microsoft Learn: Kerberos authentication](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
