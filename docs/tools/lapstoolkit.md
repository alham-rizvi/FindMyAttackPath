---
id: lapstoolkit
type: tool
label: "LAPSToolkit"
repo: "leoloobeek/LAPSToolkit"
category: "Recon"
---

## Overview

LAPSToolkit is a PowerShell toolkit for Windows LAPS and legacy Microsoft LAPS assessment.

## High-level capabilities

Inventories LAPS coverage and inspects AD objects and ACLs that govern password storage or password-read access.

## Safe authorized assessment and defensive use

Use to verify least-privilege password-read rights and policy coverage. Password retrieval requires separate approval.

## Prerequisites and operating boundaries

AD read rights for policy and LAPS attributes, suitable PowerShell context, and visibility of legacy or Windows LAPS schemas.

## Observable behavior and defensive considerations

Directory reads of LAPS attributes, policy application and password rotation, local-administrator authentication, and DC logs.

## Limitations

Legacy LAPS and Windows LAPS use different attributes and protections. Nested ACLs, encryption, expiry, and policy application matter.

## References

- [Project repository: LAPSToolkit](https://github.com/leoloobeek/LAPSToolkit)
- [Microsoft Learn: Windows LAPS](https://learn.microsoft.com/windows-server/identity/laps/laps-overview)
