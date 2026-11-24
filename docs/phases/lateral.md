---
id: lateral
type: phase
label: "Lateral Movement"
---

# Lateral Movement

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Objective
Move host-to-host using hashes, tickets, or delegated access.

## Detection
**4624 Type 3/10**, **7045** service creation, **4688 parent `WmiPrvSE.exe`**, WinRM 91/168.

---
