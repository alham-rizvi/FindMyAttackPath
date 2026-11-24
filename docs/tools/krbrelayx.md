---
id: krbrelayx
type: tool
label: "krbrelayx"
repo: "dirkjanm/krbrelayx"
category: "Kerberos"
---

## Overview

krbrelayx is a Python toolkit for Kerberos relay and delegation research.

## High-level capabilities

Kerberos listeners, relay helpers, and support for studying unconstrained or constrained delegation relationships.

## Authorized red-team assessment and defensive use

Use only in an isolated lab to test relay, channel, SPN, and delegation boundaries with test identities.

## Prerequisites and operating boundaries

Written authorization, controlled relay endpoints, reachable KDC/services, compatible delegation and SPN state, and rollback.

## Observable behavior and defensive considerations

KDC AS/TGS and service-logon events, SMB/HTTP/LDAP authentication, DC/endpoint logs, and listener traffic.

## Limitations

Success depends on protocol flags, channel protection, encryption, SPNs, account state, and service configuration.

## References

- [Project repository: krbrelayx](https://github.com/dirkjanm/krbrelayx)
- [Microsoft Learn: Kerberos authentication](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
