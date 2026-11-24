---
id: wmi_fileless
type: technique
label: "Fileless WMI event-subscription execution"
phase: "lateral"
tools: []
cve: null
detect: "WMI permanent-subscription creation events."
mitre: "T1546.003"
tag: null
---


# Fileless WMI event-subscription execution

### Affected object / attribute
**WMI + PowerShell in-memory execution** (no disk artifact).

### Concept (deep)
Execute entirely in memory via WMI + PowerShell (`Invoke-WmiMethod`, `[wmiclass]`), avoiding disk artifacts.

### Commands
```powershell
Invoke-WmiMethod -Class Win32_Process -Name Create \
  -ArgumentList "powershell -enc <b64>"
```

### Detection
**4104 script block logging**; AMSI; WMI persistence (`__EventFilter`/`CommandLineEventConsumer`) creation (**5861**).

---
