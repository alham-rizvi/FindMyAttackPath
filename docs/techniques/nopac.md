---
id: nopac
type: technique
label: "noPac (sAMAccountName spoofing)"
phase: "privesc"
tools: ["impacket", "rubeus", "powermad"]
cve: "cve-2021-42287"
detect: "4769 showing sAMAccountName/dNSHostName spoofing."
mitre: "T1558"
tag: "new"
---


# noPac (sAMAccountName spoofing)

### Affected object / attribute
**`sAMAccountName`** on a machine account + **KDC PAC validation**.

### Concept (deep)
See `cve-2021-42287.md`. Machine rename + KDC name re-lookup → **DC-equivalent ticket**.

### Commands
```bash
