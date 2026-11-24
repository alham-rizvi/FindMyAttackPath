---
id: improhound
type: tool
label: "ImproHound"
repo: "improsec/ImproHound"
category: "Graph"
---

## Overview

ImproHound is a BloodHound analysis utility for tier-boundary and Tier 0 violations.

## High-level capabilities

Compares graph relationships with a configured tier model and flags objects or paths crossing administrative boundaries.

## Authorized red-team assessment and defensive use

Use to validate tiering, find unintended privilege relationships, and track exceptions for remediation.

## Prerequisites and operating boundaries

Representative BloodHound data, reviewed tier labels, and controlled graph-data access.

## Observable behavior and defensive considerations

Graph import/export, database/API/report, and file-access logs; it does not collect the domain directly.

## Limitations

Boundary findings depend on model and graph completeness. A cross-tier relationship is not necessarily exploitable end to end.

## References

- [Project repository: ImproHound](https://github.com/improsec/ImproHound)
- [BloodHound documentation](https://bloodhound.specterops.io/)
