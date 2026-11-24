---
id: coerce_relay
type: technique
label: "Coerced authentication → NTLM relay"
phase: "initial"
tools: ["petitpotam", "coercer", "shadowcoerce", "dfscoerce", "impacket", "responder", "mitm6"]
cve: null
detect: "4624 type 3 from a machine account; unexpected outbound auth from a server."
mitre: "T1187 / T1557.001"
tag: null
---


# Coerced authentication → NTLM relay

### Affected object / attribute
**Authentication coercion** (EFSRPC, RPRN, DFSNM) + **relay target** (SMB/LDAPS/HTTP).

### Concept (deep)
Force a privileged principal to authenticate to you, then **relay** that auth to a target without signing/EPA. Coercion catalogue: **EFSRPC (PetitPotam)**, **RPRN (PrinterBug)**, **DFSNM (DFSCoerce)**, **ShadowCoerce**, **MSEven**.

### Attack flow (Mermaid)
```mermaid
flowchart TD
    A[Coercion: EFSR/RPRN/DFSNM] --> B[Victim auth to attacker]
    B --> C{Target}
    C -->|SMB no signing| D[secretsdump]
    C -->|LDAPS no EPA| E[add computer / RBCD / shadow creds]
    C -->|HTTP /certsrv| F[ESC8 → cert]
```

### Exhaustive commands
```bash
