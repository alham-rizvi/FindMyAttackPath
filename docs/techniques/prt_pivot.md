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
Use Primary Refresh Token artifacts from a hybrid-joined device to move from on-prem access into Entra ID and Microsoft 365.

## Prerequisite
Admin access to a hybrid-joined device.

## How it works

A Primary Refresh Token (PRT) is a protected authentication artifact associated with a user and a registered or hybrid-joined device. If a device or user session is compromised, access to the PRT-backed sign-in context may enable cloud access consistent with the user's permissions and tenant policies. It is not a general-purpose password, and protections depend on device state, hardware-backed keys, and conditional access.

## Defensive checks

Protect and monitor hybrid-joined endpoints, enforce compliant-device and phishing-resistant sign-in policies, and investigate unfamiliar device IDs, locations, and token-backed sign-ins. During response, revoke sessions and refresh tokens as appropriate and remediate the compromised endpoint before restoring access.

## References

- [Microsoft: Primary Refresh Tokens](https://learn.microsoft.com/entra/identity/devices/concept-primary-refresh-token)
- [Microsoft: Conditional Access overview](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: Use Alternate Authentication Material](https://attack.mitre.org/techniques/T1550/)
