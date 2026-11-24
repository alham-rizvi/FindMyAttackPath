---
id: aadconnect
type: technique
label: "Entra Connect credential extraction"
phase: "hybrid"
tools: ["aadinternals"]
cve: null
detect: "Access to the ADSync/Entra Connect database."
mitre: "T1552.001"
tag: null
---


# Entra Connect credential extraction

### Affected object / attribute
**AAD Connect connector account** (`MSOL_*`) with **replication rights** on the domain, and the **on-prem sync credentials** stored encrypted in the AAD Connect SQL/LocalDB.

### Concept (deep)
Azure AD Connect needs to read and replicate directory data to synchronise it to Entra ID. The connector account is therefore effectively **DCSync-capable** by design. The host also stores the **on-premises sync account** and cloud credentials encrypted. Compromising the AAD Connect host yields both **domain replication** and a **cloud persistence path** (especially with Password Hash Sync, where resetting an on-prem password also resets the cloud password).

### Attack flow (Mermaid)
```mermaid
flowchart TD
    A[Host access to AAD Connect] --> B[Extract MSOL_/sync credentials]
    B --> C[DCSync with connector account]
    B --> D[Cloud Global Admin / PHS abuse]
    C --> E[Domain compromise]
    D --> E
```

### Exhaustive commands
```bash
