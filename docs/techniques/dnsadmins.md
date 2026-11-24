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

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**DNS service registry `ServerLevelPluginDll`** on a DC.

## Detection
DNS registry **`ServerLevelPluginDll`** (**4657**); DNS service restart (**7036**); `dns.exe` loading a non-Microsoft DLL (**Sysmon 7**).

---

## References

- [Microsoft: Domain Name System in Windows Server](https://learn.microsoft.com/en-us/windows-server/networking/dns/dns-overview)
- [BloodHound documentation](https://bloodhound.specterops.io/)
