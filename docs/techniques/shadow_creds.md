---
id: shadow_creds
type: technique
label: "Shadow Credentials attack"
phase: "privesc"
tools: ["whisker", "pywhisker", "certipy", "pkinittools"]
cve: null
detect: "5136 on msDS-KeyCredentialLink."
mitre: "T1556"
tag: "new"
---


# Shadow Credentials attack

### Affected object / attribute
**`msDS-KeyCredentialLink`** on a user or computer.

### Concept (deep)
Write the attribute → inject your **public key** → target performs **PKINIT** with your key → you get the target’s TGT. No password needed. **Survives password resets** until the key is explicitly removed.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as attacker
    participant DC
    A->>DC: write msDS-KeyCredentialLink (target)
    A->>DC: PKINIT with attacker key as target
    DC-->>A: TGT for target
```

### Exhaustive commands
```bash
