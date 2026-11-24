---
id: kerberoast
type: technique
label: "Kerberoasting"
phase: "initial"
tools: ["rubeus", "impacket", "hashcat"]
cve: null
detect: "4769 requesting RC4 (etype 0x17) for an unusual SPN."
mitre: "T1558.003"
tag: null
---

# Kerberoasting

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**User account with an SPN** (`servicePrincipalName`), `msDS-SupportedEncryptionTypes`.

## Detection and defensive measures
**4769 with `TicketEncryptionType=0x17`** for service accounts, **bursts from one user across many SPNs**. Move to **AES-only** (`msDS-SupportedEncryptionTypes`), use **gMSA**, and deploy a **honeypot SPN**.

---
