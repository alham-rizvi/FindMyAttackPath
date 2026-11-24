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
