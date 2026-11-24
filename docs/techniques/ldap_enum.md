---
id: ldap_enum
type: technique
label: "LDAP / ADSI enumeration"
phase: "recon"
tools: ["powerview", "adrecon", "adpeas", "adcollector", "ldapsearch-ad", "windapsearch", "adsearch"]
cve: null
detect: "Directory Service Access (4662); elevated LDAP query volume."
mitre: "T1087.002"
tag: null
---


# LDAP / ADSI enumeration

### Affected object / attribute
**LDAP directory** — users, groups, computers, SPNs, trusts, GPOs, ACLs.

### Concept (deep)
LDAP is the AD API. Unauthenticated (if allowed) or low-priv enumeration feeds every other attack.

### Exhaustive commands
```bash
# ── NetExec LDAP ─────────────────────────────────────────────────────
nxc ldap 10.10.10.5 -u lowpriv -p 'Password123!' \
  --users --groups --computers --trusted-for-delegation

# ── ldapsearch ───────────────────────────────────────────────────────
ldapsearch -H ldap://10.10.10.5 -x -D 'lowpriv@corp.local' -w 'Password123!' \
  -b 'DC=corp,DC=local' '(objectClass=user)' sAMAccountName

# ── windapsearch ─────────────────────────────────────────────────────
windapsearch -d corp.local -u lowpriv -p 'Password123!' \
  --da --unconstrained-users --privileged-users
```

### Detection
LDAP query volume/SAMR enumeration; enable **LDAP signing + channel binding**; restrict anonymous binds.

---
