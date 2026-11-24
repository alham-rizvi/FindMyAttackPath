---
id: adcs_esc3
type: technique
label: "AD CS ESC3 (enrollment-agent policy)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Monitor enrollment-agent issuance, requester/subject differences, required signatures, and enrollment-agent template ACL changes."
mitre: "T1649"
tag: null
---


# AD CS ESC3 (enrollment-agent policy)

### Affected object / attribute
**Certificate template** with the **Certificate Request Agent EKU** and low-priv enrolment.

### Concept (deep)
The attacker obtains an **agent certificate**, then uses it to request a certificate **on behalf of** a privileged user. This is a **two-stage chain**: enrol agent → enrol on-behalf-of.

### Attack flow (Mermaid)
```mermaid
flowchart TD
    A[lowpriv] --> B[Enrol Agent Certificate]
    B --> C[Request on-behalf-of Administrator]
    C --> D[Certificate for Administrator]
    D --> E[PKINIT → DA]
```

### Commands
```bash
