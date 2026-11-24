---
id: prt_pivot
type: technique
label: "Entra ID PRT pivoting"
phase: "hybrid"
tools: ["roadtools", "aadinternals"]
cve: null
detect: "Entra ID sign-in log anomalies; unusual PRT token requests."
mitre: "T1550"
tag: null
---

# Entra ID PRT pivoting

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**Primary Refresh Token (PRT)** on a hybrid device.

## Detection
Token replay from a different IP/device; Entra “anomalous token” detections; require token protection/CA policies.

---

## References

- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1550](https://attack.mitre.org/techniques/T1550/)
