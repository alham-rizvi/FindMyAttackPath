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
