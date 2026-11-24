---
id: passkey_replay
type: technique
label: "Pass-the-passkey"
phase: "hybrid"
tools: []
cve: null
detect: "FIDO2 authentication anomalies."
mitre: "T1550"
tag: "new"
---

# Pass-the-passkey

“Pass-the-passkey” is often imprecise: FIDO2/WebAuthn assertions are origin/challenge-bound, while PRT or broker session artifacts represent a separate device authentication context.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Relying-party origin/RP ID and challenge, FIDO2 authenticator/key, WebAuthn client, Entra tenant and app, PRT/broker/CloudAP state, device registration/compliance and Conditional Access are relevant.

## Prerequisite chain

The exact assertion, key or session artifact must exist and remain accepted. A raw assertion is not generally reusable; device-bound keys and PRTs depend on platform/tenant context.


## Impact limits and failure cases

Authenticator/sync type, origin, user verification/MFA, CA, token protection, device compliance, key exportability and OS broker determine impact. PRT or token theft is not equivalent to private passkey theft.

## Detection and validation

Review Entra sign-in/audit for origin/RP, MFA method, device/broker/key changes, PRT/token requests, failures and CA/risk results.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Require phishing-resistant passkeys/device-bound keys and appropriate authentication strength, protect broker/device keys and use CA/token protection.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1550](https://attack.mitre.org/techniques/T1550/)
