---
id: bloodhound_collect
type: technique
label: "BloodHound graph collection"
phase: "recon"
tools: ["bloodhound", "sharphound", "bloodhoundpy", "rusthound", "netexec", "goodhound", "improhound"]
cve: null
detect: "Collector execution; large LDAP/SMB session bursts; ZIP creation."
mitre: "T1087 / T1482"
tag: null
---


# BloodHound graph collection

### Affected object / attribute
**Graph of users, computers, groups, GPOs, trusts, ACLs, ADCS, sessions, containers**.

### Concept (deep)
Collection method matters for OPSEC. `-c All` is comprehensive but noisy; `-c DCOnly,ACL,Trusts,ObjectProps` is stealthier.

### Commands
```bash
# ── SharpHound (Windows) ─────────────────────────────────────────────
SharpHound.exe -c All --zipfilename bh.zip
SharpHound.exe -c DCOnly,ACL,Trusts,ObjectProps --zipfilename bh_stealth.zip

# ── bloodhound-python (Linux) ────────────────────────────────────────
bloodhound-python -d corp.local -u lowpriv -p 'Password123!' \
  -c All -dc dc01.corp.local -ns 10.10.10.5

# ── Key queries in the BloodHound UI ─────────────────────────────────
# "Shortest Paths to Domain Admins"
# "Find Principals with DCSync Rights"
# "Shortest Paths to High Value Targets"
```

### Impact
**Ranked attack paths** to DA/DCSync/ADCS.

### Detection
LDAP query bursts, SAMR enumeration, SharpHound/bloodhound-python user agents.

---
