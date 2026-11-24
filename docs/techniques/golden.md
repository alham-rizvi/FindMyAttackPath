---
id: golden
type: technique
label: "Golden ticket"
phase: "persist"
tools: ["mimikatz", "rubeus"]
cve: null
detect: "A 4769 with no matching 4768; a TGT lifetime outside domain policy."
mitre: "T1558.001"
tag: null
---


# Golden ticket

### Affected object / attribute
**`krbtgt` account** key (NT hash or AES).

### Concept (deep)
Forge a **TGT** with the `krbtgt` key: any user, any group, any lifetime. Survives resets of other accounts; only a **double krbtgt reset** invalidates it.

### Exhaustive commands
```bash
