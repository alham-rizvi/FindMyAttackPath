---
id: rbcd
type: technique
label: "Resource-Based Constrained Delegation (RBCD)"
phase: "privesc"
tools: ["impacket", "rubeus", "rbcdpy", "powermad"]
cve: null
detect: "Attribute write on msDS-AllowedToActOnBehalfOfOtherIdentity."
mitre: "T1558"
tag: "new"
---


# Resource-Based Constrained Delegation (RBCD)

### Affected object / attribute
**`msDS-AllowedToActOnBehalfOfOtherIdentity`** on the **target computer object**.

### Concept (deep)
The target’s attribute names the delegate. If you can write it (GenericWrite/WriteDacl, or LDAP relay), set your machine account → **S4U2Self + S4U2Proxy** → impersonate DA to the target. Needs **MAQ>0** or an existing writable computer**.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as attacker machine PWN$
    participant DC
    participant T as target
    A->>DC: write msDS-AllowedToActOnBehalfOfOtherIdentity on T
    A->>DC: S4U2Self / S4U2Proxy
    DC-->>A: ticket to T as Administrator
    A->>T: psexec
```

### Exhaustive commands
```bash
