---
id: prt_pivot
type: technique
label: "Entra ID PRT pivoting"
phase: "hybrid"
tools: ["roadtools", "aadinternals"]
cve: null
detect: "Entra ID sign-in log anomalies; unusual PRT token requests."
mitre: "T1550"
tag: null
---


# Entra ID PRT pivoting

### Affected object / attribute
**Primary Refresh Token (PRT)** on a hybrid device.

### Concept (deep)
The PRT is the Entra ID equivalent of a TGT. Theft from a hybrid device (with the device key + session key) allows token replay to Graph/Exchange and, with device writeback, on-prem pivot.

### Commands
```bash
