---
id: recon
type: phase
label: "Reconnaissance & Enumeration"
---


# Reconnaissance & Enumeration

### Objective
Build a complete graph of the domain **before touching anything**. The output is an owned-principal list and ranked attack paths.

### Affected objects (what you are enumerating)
Users, computers, groups, OUs, GPOs, trusts, ADCS templates, ACLs, sessions, LAPS/gMSA attributes, and **`ms-DS-MachineAccountQuota`**.

### Step-by-step workflow
```mermaid
flowchart TD
    A[No credentials] --> B[Unauthenticated: SMB/LDAP sweep, kerbrute userenum]
    B --> C[Any credentials: BloodHound All, certipy find, trust enum]
    C --> D[Session / ADCS / MAQ / LAPS ACL review]
    D --> E[Shortest paths to DA / DCSync / ADCS]
```

### Exhaustive commands
```bash
