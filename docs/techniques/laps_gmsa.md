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
