---
id: recon
type: phase
label: "Reconnaissance & Enumeration"
---

# Reconnaissance & Enumeration

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Objective
Build a complete graph of the domain **before touching anything**. The output is an owned-principal list and ranked attack paths.

## Affected objects (what you are enumerating)
Users, computers, groups, OUs, GPOs, trusts, ADCS templates, ACLs, sessions, LAPS/gMSA attributes, and **`ms-DS-MachineAccountQuota`**.

## Exit criteria
An owned-principal set and at least one ranked path: **DCSync rights**, **ADCS ESC**, **delegation**, or an **ACL edge**.

## Detection (what your recon trips)
LDAP query volume, SAMR enumeration, BloodHound user-agent strings, and 4662 mass object reads.

---
