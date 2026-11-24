---
id: roadtools
type: tool
label: "ROADtools"
repo: "dirkjanm/ROADtools"
category: "Hybrid / Cloud"
---

## Overview

ROADtools is a Python framework for Entra ID and Microsoft 365 identity research.

## High-level capabilities

Tenant and directory discovery, device/application metadata, authentication context, token workflows, and Microsoft identity API experimentation.

## Authorized red-team assessment and defensive use

Use for authorized tenant inventory, incident analysis, role/consent review, and controlled lab validation of Entra controls.

## Prerequisites and operating boundaries

Tenant authorization, credentials or tokens with the needed role, Microsoft identity network access, and secure output storage.

## Observable behavior and defensive considerations

Entra sign-in/audit logs, Graph/service API requests, token use, consent, role/device changes, and application telemetry.

## Limitations

Licensing and role scope limit data. Token or directory properties do not prove replay or privilege without tenant-context validation.

## References

- [Project repository: ROADtools](https://github.com/dirkjanm/ROADtools)
- [Microsoft Entra documentation](https://learn.microsoft.com/entra/)
