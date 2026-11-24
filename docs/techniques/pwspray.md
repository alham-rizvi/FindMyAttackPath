---
id: pwspray
type: technique
label: "Password spraying"
phase: "initial"
tools: ["kerbrute", "netexec"]
cve: null
detect: "4625 bursts across many accounts from one source."
mitre: "T1110.003"
tag: null
---

# Password spraying

Password spraying is a controlled high-volume authentication assessment of a predefined candidate set against many accounts. It must be bounded by written lockout and account-safety plans.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Identity account set, authentication endpoint, lockout/smart-lockout policy, observation/reset window, MFA/Conditional Access, legacy protocols, source reputation and identity-protection logs are involved.

## Prerequisite chain

Written scope, approved account range/candidate set, test window and stop thresholds are mandatory. MFA and source controls must be respected; no guessing parameters are included here.


## Impact limits and failure cases

Lockout threshold/window/reset behavior, smart lockout, MFA, legacy protocols, source reputation and account-risk policy alter outcomes. No successful test should expand scope beyond authorization.

## Detection and validation

Correlate 4625/Entra sign-in bursts across accounts from a source, lockouts, MFA/risk failures and source reputation. Baseline approved scanners and identity tools.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Require MFA/phishing resistance, smart/risk-based lockout and strong unique passwords; disable unnecessary legacy auth and monitor account patterns.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1110.003](https://attack.mitre.org/techniques/T1110.003/)
