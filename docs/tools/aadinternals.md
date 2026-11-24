---
id: aadinternals
type: tool
label: "AADInternals"
repo: "Gerenios/AADInternals"
category: "Hybrid / Cloud"
---

## Overview

AADInternals is a PowerShell toolkit for Microsoft Entra ID and hybrid identity assessment.

## High-level capabilities

Tenant and object discovery, authentication and application configuration review, synchronization context, token/OAuth workflows, and selected tenant administration exposed by Entra APIs.

## Safe authorized assessment and defensive use

Use only an authorized tenant or test tenant. Prefer inventory and policy review; isolate modules that create, consent, modify, acquire, or replay identity artifacts.

## Prerequisites and operating boundaries

An authorized Entra identity with the role or API scope required by each module, network access to Microsoft identity endpoints, and a controlled PowerShell host.

## Observable behavior and defensive considerations

Entra sign-in and audit events, Graph/API requests, application consent and role changes, synchronization records, and PowerShell host telemetry.

## Limitations

Coverage and authorization depend on licenses, roles, tenant policy, API changes, and module maturity. A configuration view does not prove exploitability.

## References

- [Project repository: AADInternals](https://github.com/Gerenios/AADInternals)
- [Microsoft Entra documentation](https://learn.microsoft.com/entra/)
