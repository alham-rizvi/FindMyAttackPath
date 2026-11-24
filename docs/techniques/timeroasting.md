---
id: timeroasting
type: technique
label: "Timeroasting"
phase: "cred"
tools: ["timeroast", "hashcat"]
cve: null
detect: "Anomalous NTP/MS-SNTP query volume against a DC."
mitre: "T1110"
tag: "new"
---


# Timeroasting

### Affected object / attribute
**MS-SNTP authentication** — computer and trust accounts.

### Concept (deep)
MS-SNTP auth uses a checksum keyed by the **computer account password**. Unauthenticated crafted NTP requests to a DC yield `$sntp-ms$` hashes for **all computer accounts** (and sometimes gMSA) → crack with hashcat **31300**.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as unauthenticated attacker
    participant DC
    A->>DC: Crafted MS-SNTP request (RID)
    DC-->>A: $sntp-ms$ hash
    A->>A: hashcat -m 31300
```

### Commands
```bash
