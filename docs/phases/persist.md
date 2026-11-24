---
id: persist
type: phase
label: "Domain Persistence & Dominance"
---

# Domain Persistence & Dominance

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Objective
Survive remediation, scoped and reversible.

## Detection
**4662** replication; **4769 without 4768**; **5136** on AdminSDHolder; **4742/5136** sIDHistory writes; CA key export; LSASS patch telemetry.

---
