---
id: adcs_enum
type: technique
label: "ADCS template & CA enumeration"
phase: "recon"
tools: ["certipy", "certify"]
cve: null
detect: "LDAP reads of pKICertificateTemplate objects."
mitre: "T1649 (precursor)"
tag: null
---


# ADCS template & CA enumeration

### Affected object / attribute
**`pKIEnrollmentService`** (CA objects), **`pKICertificateTemplate`** (templates), **CA registry flags**, **web enrolment endpoints**, and **`msDS-OIDToGroupLink`**.

### Concept (deep)
ADCS enumeration is the foundation of every ESC finding. A single `certipy find` reports CA flags, template settings, enrolment rights, and vulnerable ESC paths. The key is to review **CA-level flags independently of template flags** — a CA flag overrides every template on that CA.

### Exhaustive commands
```bash
# ── Certipy full enumeration ─────────────────────────────────────────
certipy find -u lowpriv@corp.local -p 'Password123!' \
  -dc-ip 10.10.10.5 -enabled -vulnerable -text -stdout

# ── Hide admin-only findings (cleaner output) ───────────────────────
certipy find -u lowpriv@corp.local -p 'Password123!' \
  -dc-ip 10.10.10.5 -hide-admins

# ── Windows Certify ──────────────────────────────────────────────────
Certify.exe find /vulnerable

# ── Raw CA flag check ────────────────────────────────────────────────
certutil -config "CORP-CA\dc01.corp.local" -getreg policy\EditFlags

# ── LDAP CA object query ─────────────────────────────────────────────
ldapsearch -H ldap://10.10.10.5 -x -D 'lowpriv@corp.local' -w 'Password123!' \
  -b "CN=Enrollment Services,CN=Public Key Services,CN=Services,CN=Configuration,DC=corp,DC=local" \
  "(objectClass=pKIEnrollmentService)" cn editFlags
```

### Impact
- A **matrix of ESC findings** (see `adcs_esc_matrix.md`) that determines the exploitation path.

### Detection
LDAP reads of `pKIEnrollmentService`/`msPKI-*` attributes; Certipy user-agent in IIS logs.

---
