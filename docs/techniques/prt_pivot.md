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

A Primary Refresh Token represents a joined-device/user sign-in context and can be exchanged by a supported broker for resource tokens under tenant policy.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Device join/registration state, PRT/broker/CloudAP and derived-key context, Entra account, target app audience, Conditional Access/token protection, device compliance, lifetime and revocation are involved.

## Prerequisite chain

A valid PRT/derived credential and matching broker/device context are required. The tenant/resource must accept the resulting token; PRT material is not an application password or automatically portable.


## Impact limits and failure cases

Device compliance, account/risk state, CA/MFA, token protection, OS/broker, key isolation and lifetime/revocation determine usability.

## Detection and validation

Monitor Entra sign-in/audit for PRT/broker exchange, new OS/device, risk/CA, refresh/token activity and device-registration/key changes.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Require supported broker/device compliance, CA/risk/token protection and remove stale devices.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1550](https://attack.mitre.org/techniques/T1550/)
