---
id: sidhistory
type: technique
label: "SID history injection"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "4765/4766 SID-history change events."
mitre: "T1134.005"
tag: null
---


# SID history injection

### Affected object / attribute
**`sIDHistory`** on a user or computer.

### Concept (deep)
`sIDHistory` is honoured in token creation. Writing a **DA SID** into a controlled user’s `sIDHistory` gives that user DA rights in the token. Requires write on the user (or **DCShadow**).

### Commands
```bash
# ── PowerView ────────────────────────────────────────────────────────
Set-DomainObject -Identity lowpriv -Set @{sidHistory='S-1-5-21-X-500'}
```

### Detection
**5136** on `sIDHistory`; **4765/4766**; alert on any `sIDHistory` write.

---
