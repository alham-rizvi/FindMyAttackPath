---
id: bloodhound
type: tool
label: "BloodHound"
repo: "SpecterOps/BloodHound"
category: "Graph"
---
## Overview
BloodHound is an identity-relationship graph platform for Active Directory (AD) and Entra data. It represents relationships among identities, groups, computers, permissions, and policies so assessors and defenders can reason about exposure and control boundaries.

## High-level capabilities
BloodHound supports graph ingestion, relationship modeling, path analysis, query views, and remediation prioritization. In an AD assessment, the graph can help explain how a combination of permissions or group membership might create a route from a lower-trust identity to a protected asset. A graph path is a hypothesis about effective access, not proof that a path is usable or that a system was compromised.

Collectors such as SharpHound and BloodHound.py gather directory and, depending on collection choices, host-related data. Collection scope and freshness matter: session observations are time-sensitive, while directory permissions and group memberships can change. Use the collector and platform versions supported by the organization and document what data was and was not collected.

## Authorized assessment and defensive use
For a scoped assessment, agree in advance on the domains, collection types, identities, operating windows, storage location, and data-retention period. Prefer the minimum collection needed to answer the assessment question. Treat exports as sensitive identity and infrastructure data: restrict access, encrypt at rest and in transit, avoid placing them in public or shared locations, and dispose of them under the engagement's retention requirements.

Use graph findings to validate specific control questions, such as whether privileged groups have unnecessary delegated permissions, whether tier boundaries are respected, or whether service identities have excessive reach. Confirm important relationships with the system owner and appropriate read-only evidence before reporting them. Do not infer compromise solely from a visual path, and do not use graph results as a reason to access accounts or systems outside scope.

## Interpretation, detection, and remediation
Prioritize paths by business impact, confidence, and the number of independent relationships that would need to be changed. Recommended defensive actions may include removing unnecessary rights, reducing privileged group membership, separating administrative tiers, limiting local administrator assignments, and reviewing delegation configuration. Re-import or otherwise refresh data after changes to verify that the intended relationship changed; note collector coverage and collection time when comparing results.

Collection itself can generate directory queries and endpoint activity. Coordinate with monitoring teams, retain collection timestamps and source identity, and distinguish approved assessment activity from unexpected collection. Secure or remove imported graph data when the review is complete.

## Prerequisites and operating boundaries
Use an approved BloodHound CE deployment, a current and appropriately scoped dataset, a secure graph repository, and an agreed tier model. Collector execution, host/session collection, and data export require explicit authorization because their reach and sensitivity vary. This guide intentionally provides no target-enumeration instructions or runnable collection commands.

## Related documentation
- [BloodHound collection concepts](../techniques/bloodhound_collect.md)
- [BloodHound.py](bloodhoundpy.md)
- [SharpHound](sharphound.md)
- [RustHound](rusthound.md)
- [GoodHound prioritization](goodhound.md)
