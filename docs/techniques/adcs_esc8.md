---
id: adcs_esc8
type: technique
label: "ADCS ESC8 (NTLM relay to CA web enrollment)"
phase: "privesc"
tools: ["impacket", "petitpotam", "coercer", "certipy"]
cve: null
detect: "Certificate issuance outside normal workflow; relay traffic to /certsrv/."
mitre: "T1649"
tag: null
---


# ADCS ESC8 (NTLM relay to CA web enrollment)

### Affected object / attribute
**ADCS web-enrolment endpoint** (`/certsrv/`) — NTLM authentication.

### Concept (deep)
HTTP enrolment accepts **NTLM**. Coerce a DC/privileged machine and **relay** to the endpoint → **machine certificate** → **PKINIT** → DCSync rights.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant V as DC (coerced)
    participant A as ntlmrelayx
    participant CA as /certsrv
    V->>A: NTLM
    A->>CA: Relay NTLM
    CA-->>A: DC machine certificate
    A->>A: PKINIT → TGT (DC$)
    A->>A: DCSync
```

### Commands
```bash
