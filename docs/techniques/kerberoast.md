---
id: kerberoast
type: technique
label: "Kerberoasting"
phase: "initial"
tools: ["rubeus", "impacket", "hashcat"]
cve: null
detect: "4769 requesting RC4 (etype 0x17) for an unusual SPN."
mitre: "T1558.003"
tag: null
---


# Kerberoasting

### Affected object / attribute
**User account with an SPN** (`servicePrincipalName`), `msDS-SupportedEncryptionTypes`.

### Concept (deep)
Any domain user can request a **TGS for any SPN**; the ticket is encrypted with the service account key — crack offline. **RC4 (0x17)** tickets crack far faster than AES, so attackers downgrade to RC4.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as any user
    participant KDC
    A->>KDC: TGS-REQ for SPN (no access check)
    KDC-->>A: TGS encrypted with svc key (RC4/AES)
    A->>A: hashcat -m 13100 (RC4) / -m 19700 (AES)
```

### Exhaustive commands
```bash
