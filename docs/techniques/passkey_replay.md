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

### Affected object / attribute
**Entra ID passkey (FIDO2)** authentication.

### Concept (deep)
Hybrid Entra ID passkey authentication can be **replayed** where the private key is device-bound and the attacker has code execution on that device, or where WebAuthn assertions are captured and the RP lacks origin/challenge binding. **Emerging — validate the exact RP configuration.**

### Detection
Sign-ins with passkey from atypical device/ASN; replay of the same assertion `signCount`; require attested, phishing-resistant authenticators.

---
