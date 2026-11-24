---
id: wmi_fileless
type: technique
label: "Fileless WMI event-subscription execution"
phase: "lateral"
tools: []
cve: null
detect: "WMI permanent-subscription creation events."
mitre: "T1546.003"
tag: null
---

# Fileless WMI event-subscription execution

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**WMI + PowerShell in-memory execution** (no disk artifact).

## Detection
**4104 script block logging**; AMSI; WMI persistence (`__EventFilter`/`CommandLineEventConsumer`) creation (**5861**).

---

# PART 4 — `docs/tools/`

Each tool entry follows: **Purpose → Install → Key commands → When to use → Caveat / detection.**

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1546.003](https://attack.mitre.org/techniques/T1546/003/)
