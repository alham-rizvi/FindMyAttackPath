---
id: rbcd
type: technique
label: "Resource-Based Constrained Delegation (RBCD)"
phase: "privesc"
tools: ["impacket", "rubeus", "rbcdpy", "powermad"]
cve: null
detect: "Attribute write on msDS-AllowedToActOnBehalfOfOtherIdentity."
mitre: "T1558"
tag: "new"
---

# Resource-Based Constrained Delegation (RBCD)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`msDS-AllowedToActOnBehalfOfOtherIdentity`** on the **target computer object**.

## Detection
**5136** on computer objects for `msDS-AllowedToActOnBehalfOfOtherIdentity`; **4741** new machine accounts; **4769 S4U2Proxy** chains.

---
