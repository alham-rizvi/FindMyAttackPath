---
id: resetnightmare
type: technique
label: "ResetNightmare"
phase: "privesc"
tools: []
cve: "cve-2026-27912"
detect: "Correlate Kerberos authorization, account-change, DC/endpoint and adjacent-network telemetry; do not treat 4724 or kpasswd activity as CVE proof."
mitre: "T1098"
tag: "new"
---


# ResetNightmare

### Affected object / attribute
**`pwdLastSet`** / victim password.

### Concept (deep)
Password-reset abuse chain: force `pwdLastSet=0` / reset a victim’s password (requires `User-Force-Change-Password`/`GenericAll`) and combine with **Shadow Credentials** or ADCS to lock the legitimate user out and keep access. **Emerging naming — confirm the exact published chain.**

### Commands
```bash
