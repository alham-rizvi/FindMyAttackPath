---
id: cred
type: phase
label: "Credential Access"
---

# Credential Access

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Objective
Convert access into credential material: LSASS, SAM/LSA/NTDS, DPAPI, gMSA/LAPS, Timeroast, Shadow Credentials, roasting.

## Exit criteria
Hashes/tickets mapped to principals and **owned** status in BloodHound.

---
