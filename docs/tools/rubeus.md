---
id: rubeus
type: tool
label: "Rubeus"
repo: "GhostPack/Rubeus"
category: "Kerberos"
---
## Overview
Rubeus is a C# Kerberos ticket and authentication research suite for Windows. It is used in security research and authorized testing to study Kerberos behavior, ticket lifecycle, delegation, and authentication configuration. Some functions manipulate ticket caches or handle authentication material and therefore carry high impact.

## High-level capabilities
At a conceptual level, Rubeus supports investigation of ticket request and renewal behavior, ticket-cache workflows, service-ticket exposure, account pre-authentication configuration, and delegation-related behavior. It can also interact with or manipulate tickets in ways that could impersonate identities or affect access. Such actions must not be inferred as safe simply because they use Kerberos rather than passwords.

## Authorized assessment and defensive use
Use only in an isolated lab or under explicit written authorization that identifies the approved host, identity, test objective, data handling, and stop conditions. Plan non-invasive configuration review before any test that requests tickets or interacts with a live ticket cache. Do not collect, export, inject, forge, or reuse tickets or credentials outside a specifically approved controlled test; this guide provides no such procedures.

Handle ticket metadata and authentication artifacts as secrets. Limit access to evidence, avoid retaining material that is not necessary to substantiate a finding, and securely dispose of test data. Coordinate with defenders so testing is distinguishable from suspicious Kerberos activity without suppressing useful telemetry.

## Detection and remediation context
Defenders can monitor unusual ticket-request patterns, service-ticket requests inconsistent with a user's normal role, anomalous ticket lifetimes or encryption types, suspicious delegation use, and unexpected changes to Kerberos-related directory settings. Evaluate events in context with account, workstation, service, and domain-controller telemetry; legitimate applications can produce atypical patterns.

Remediation may include using long, unique managed passwords for service identities, reducing service-account privilege, removing unnecessary delegation, enforcing supported encryption and domain policies, strengthening tier separation, and auditing privileged ticket-related operations. Reassess the configuration after changes and monitor for recurrence.

## Prerequisites and operating boundaries
Use a trusted, approved build on an authorized Windows host with an approved identity, domain/KDC reachability, and separate authorization for any sensitive ticket or authentication operation. This page is conceptual assessment and job-prep material only; it intentionally omits commands, ticket material, credential handling procedures, persistence steps, and instructions for using tickets to access real systems.

## Related documentation
- [Kerberoasting risk and defenses](../techniques/kerberoast.md)
- [AS-REP exposure concepts](../techniques/asreproast.md)
- [Pass-the-ticket concepts](../techniques/ptt.md)
- [Overpass-the-hash concepts](../techniques/opth.md)
- [Resource-based constrained delegation](../techniques/rbcd.md)
- [Constrained delegation](../techniques/constrained_deleg.md)
