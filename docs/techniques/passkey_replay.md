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
The label "pass-the-passkey" is often used imprecisely. A raw FIDO2/passkey assertion is challenge-bound and origin-bound, so it is not normally a reusable response that can simply be replayed. The realistic risk is compromise of the authenticator's private key, the user's device, or a resulting authenticated session/token.

## Prerequisite
Compromise of an authenticator, endpoint, or authenticated session; a captured assertion by itself is generally insufficient.

## How it works

Passkeys use public-key challenge-response authentication: the service supplies a fresh challenge and the authenticator signs it for the correct relying party. This design prevents ordinary replay of a previously captured assertion. Threats instead involve malware or physical access to an unlocked device, theft of a session token after authentication, or weaknesses in account recovery and device enrollment.

## Defensive checks

Use managed, patched devices and phishing-resistant authentication, protect session tokens, require strong device unlock, and alert on unexpected authenticator registration, recovery, or sign-in context. In incident response, revoke sessions and remove unrecognized authenticators; do not treat an observed passkey assertion as a reusable password.

## References

- [FIDO Alliance: Passkeys](https://fidoalliance.org/passkeys/)
- [W3C: Web Authentication specification](https://www.w3.org/TR/webauthn-3/)
- [MITRE ATT&CK: Use Alternate Authentication Material](https://attack.mitre.org/techniques/T1550/)
