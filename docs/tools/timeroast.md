---
id: timeroast
type: tool
label: "Timeroast"
repo: "SecuraBV/Timeroast"
category: "Credential Access"
---

## Overview

Timeroast is a proof of concept for assessing machine-account material exposed through MS-SNTP/Windows Time behavior.

## High-level capabilities

Obtains protocol-relevant material that can be assessed offline for machine-account password or key resilience.

## Authorized red-team assessment and defensive use

Use to test machine-account password practices in an authorized lab or bounded assessment.

## Prerequisites and operating boundaries

Authorized hosts/domain context, reachable Windows Time/MS-SNTP endpoints, and controlled offline analysis.

## Observable behavior and defensive considerations

MS-SNTP/NTP traffic, host/DC network telemetry, and offline process/file activity on the assessment host.

## Limitations

Success depends on protocol mode and machine-account behavior. Windows/network policy varies; no result is not proof of strong security.

## References

- [Project repository: Timeroast](https://github.com/SecuraBV/Timeroast)
- [Microsoft Learn: Kerberos authentication](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
