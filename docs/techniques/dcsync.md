---
id: dcsync
type: technique
label: "DCSync"
phase: "persist"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4662 with the replication-GUID access mask, from a non-DC source."
mitre: "T1003.006"
tag: null
---

# DCSync

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Domain NC root** — extended rights **`DS-Replication-Get-Changes`** and **`DS-Replication-Get-Changes-All`**.

## Impact
**krbtgt** → Golden Ticket; **DA hash** → PTH; **any user hash** → offline crack / lateral.

## Detection
**4662** with replication GUID **`1131f6aa-9c07-11d1-f79f-00c04fc2dcd2`** from a **non-DC machine account**. Apply a **SACL** to the domain NC root for the replication rights.

---
