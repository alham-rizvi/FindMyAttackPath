---
id: adcs_esc1
type: technique
label: "ADCS ESC1"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Certificate issuance (4886/4887) for an unexpected UPN."
mitre: "T1649"
tag: null
---


# ADCS ESC1

### Affected object / attribute
**Certificate template** with **enrollee-supplied SAN**, **Client Authentication EKU**, and low-priv enrolment rights.

### Concept (deep)
The template allows the requester to specify a **Subject Alternative Name**. The attacker requests a certificate with `administrator@corp.local` as the SAN. The CA issues a certificate that authenticates as the Domain Admin. The certificate is then used with **PKINIT** to obtain a TGT and the account’s NT hash.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as lowpriv
    participant CA as ADCS
    A->>CA: CSR with SAN=administrator
    CA-->>A: Certificate with admin identity
    A->>A: PKINIT → TGT → NT hash
    A->>A: DCSync / DA
```

### Exhaustive commands
```bash
