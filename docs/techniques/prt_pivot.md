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
Use Primary Refresh Token artifacts from a hybrid-joined device to move from on-prem access into Entra ID and Microsoft 365.

## Prerequisite
Admin access to a hybrid-joined device.
