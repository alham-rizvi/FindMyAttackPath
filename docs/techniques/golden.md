---
id: golden
type: technique
label: "Golden ticket"
phase: "persist"
tools: ["mimikatz", "rubeus"]
cve: null
detect: "A 4769 with no matching 4768; a TGT lifetime outside domain policy."
mitre: "T1558.001"
tag: null
---

# Golden ticket

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`krbtgt` account** key (NT hash or AES).

## Detection
**4769 without 4768**; TGT lifetime > domain policy; `krbtgt` password age anomaly; rotate **twice**.

---
