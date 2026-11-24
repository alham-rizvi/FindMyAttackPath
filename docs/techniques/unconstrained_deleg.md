---
id: unconstrained_deleg
type: technique
label: "Unconstrained delegation abuse"
phase: "privesc"
tools: ["petitpotam", "krbrelayx", "rubeus"]
cve: null
detect: "Rubeus-style TGT caching; correlated 4624/4768 events."
mitre: "T1558"
tag: null
---


# Unconstrained delegation abuse

### Affected object / attribute
**`TRUSTED_FOR_DELEGATION`** on a computer/service account.

### Concept (deep)
The service receives the user’s **forwardable TGT** and can impersonate the user anywhere. Compromise that host + coerce a **DC** → capture the **DC machine TGT** → DCSync.

### Attack flow (Mermaid)
```mermaid
flowchart TD
    A[Compromise unconstrained host] --> B[Coerce DC auth]
    B --> C[Capture DC$ TGT]
    C --> D[DCSync → krbtgt]
```

### Commands
```powershell
