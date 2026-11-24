---
id: golden_cert
type: technique
label: "Golden certificate (CA key theft)"
phase: "persist"
tools: ["forgecert", "certipy"]
cve: null
detect: "Certificate issuance that bypasses the normal CA request workflow."
mitre: "T1649"
tag: null
---


# Golden certificate (CA key theft)

### Affected object / attribute
**CA private key** (CA host compromise or backup).

### Concept (deep)
Forge certificates for any user → **PKINIT** → long-lived domain persistence (valid until the CA cert expires, independent of password resets).

### Commands
```bash
