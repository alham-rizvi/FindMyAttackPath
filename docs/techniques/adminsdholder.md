---
id: adminsdholder
type: technique
label: "AdminSDHolder / SDProp persistence"
phase: "persist"
tools: ["bloodhound", "powerview"]
cve: null
detect: "Audit AdminSDHolder ACL changes and compare protected-account security descriptors before and after SDProp processing."
mitre: "T1098"
tag: null
---


# AdminSDHolder / SDProp persistence

### Affected object / attribute
**`CN=AdminSDHolder,CN=System,DC=...`** — `nTSecurityDescriptor`.

### Concept (deep)
**SDProp** (every 60 minutes) copies the AdminSDHolder ACL to all **protected accounts and groups** (`adminCount=1`). Adding an ACE here is **quiet, durable persistence** across DA resets.

### Attack flow (Mermaid)
```mermaid
flowchart TD
    A[Write ACE on AdminSDHolder] --> B[SDProp runs every 60 min]
    B --> C[ACE propagates to Domain Admins / EA / protected groups]
    C --> D[Persistent domain-wide privilege]
```

### Commands
```bash
