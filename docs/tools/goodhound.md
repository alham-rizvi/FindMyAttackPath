---
id: goodhound
type: tool
label: "GoodHound"
repo: "idnahacks/GoodHound"
category: "Graph"
---

## Overview

GoodHound is a remediation-ranking utility for BloodHound graph findings.

## High-level capabilities

Consumes graph analyses and ranks attack paths or excessive relationships according to configurable criteria.

## Authorized red-team assessment and defensive use

Use to prioritize remediation work from validated graph evidence and compare which relationship changes reduce exposure.

## Prerequisites and operating boundaries

A representative dataset, documented scoring or tier rules, and controlled graph-data access.

## Observable behavior and defensive considerations

Graph import, database/API access, report/file generation, and analyst export activity.

## Limitations

Rankings reflect supplied weights and graph completeness and may miss compensating controls or uncollected relationships.

## References

- [Project repository: GoodHound](https://github.com/idnahacks/GoodHound)
- [BloodHound documentation](https://bloodhound.specterops.io/)
