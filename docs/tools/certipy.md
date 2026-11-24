---
id: certipy
type: tool
label: "Certipy"
repo: "ly4k/Certipy"
category: "ADCS"
---

## Overview

Certipy is a Python toolkit for AD CS inventory and certificate-related workflows.

## High-level capabilities

Enumerates CAs and templates, inspects certificate and issuance configuration, and provides certificate request, PKINIT, relay, and authentication modules in its release.

## Authorized red-team assessment and defensive use

Use read-only inventory for authorized AD CS reviews. Reserve issuance, authentication, relays, and private-key handling for an approved lab or non-production validation.

## Prerequisites and operating boundaries

Domain identity and network access to LDAP and AD CS endpoints; module-specific identities and certificates for controlled tests.

## Observable behavior and defensive considerations

LDAP CA/template reads, enrollment traffic, CA request/issuance logs, certificate authentication, Kerberos/service logons, and endpoint telemetry.

## Limitations

Template, EKU, effective ACL, CA policy, certificate mapping, trust, and revocation must align for impact. Module labels do not prove exploitability.

## References

- [Project repository: Certipy](https://github.com/ly4k/Certipy)
- [Microsoft Learn: Active Directory Certificate Services](https://learn.microsoft.com/windows-server/identity/ad-cs/)
