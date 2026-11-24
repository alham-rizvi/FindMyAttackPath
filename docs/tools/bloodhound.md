---
id: bloodhound
type: tool
label: "BloodHound"
repo: "SpecterOps/BloodHound"
category: "Graph"
---

## Overview

BloodHound is an identity relationship graph platform for AD and Entra data.

## High-level capabilities

Graph ingestion, relationship modeling, path analysis, tier-boundary review, query views, and remediation prioritization in BloodHound CE.

## Safe authorized assessment and defensive use

Use graph data to trace authorized-tier boundaries and validate whether relationships and fixes reduce exposure.

## Prerequisites and operating boundaries

BloodHound CE deployment, a current collector dataset, a secure graph repository, and an approved tier model.

## Observable behavior and defensive considerations

Collector traffic plus graph UI/API, database, authentication, export, and report-access logs.

## Limitations

Graphs are derived snapshots; stale or incomplete collection can create false paths or miss relationships. A path is not proof of exploitability.

## References

- [Project repository: BloodHound](https://github.com/SpecterOps/BloodHound)
- [BloodHound documentation](https://bloodhound.specterops.io/)
