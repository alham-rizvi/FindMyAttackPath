---
id: trust_enum
type: technique
label: "Domain & forest trust mapping"
phase: "recon"
tools: ["powerview", "netexec"]
cve: null
detect: "Trust-object LDAP queries."
mitre: "T1482"
tag: null
---


# Domain & forest trust mapping

### Affected object / attribute
**Trust objects** (`trustedDomain`) in the System container.

### Concept (deep)
Enumerate inter-forest/inter-domain trusts, direction, transitivity, and **SID filtering**. Trusts are pivot paths (SID History, trust keys).

### Commands
```bash
# ── Native / PowerView ──────────────────────────────────────────────
nltest /domain_trusts /all_trusts /v
Get-DomainTrust -Domain corp.local

# ── NetExec ──────────────────────────────────────────────────────────
nxc ldap 10.10.10.5 -u lowpriv -p 'Password123!' --trusted-for-delegation
```

### Detection
**5136** on `trustedDomain`; baseline trusts.

---
