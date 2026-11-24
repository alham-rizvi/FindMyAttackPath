---
id: aadconnect
type: technique
label: "Entra Connect credential extraction"
phase: "hybrid"
tools: ["aadinternals"]
cve: null
detect: "Access to the ADSync/Entra Connect database."
mitre: "T1552.001"
tag: null
---
Extract the sync service account's credentials from the Entra/Azure AD Connect server, enabling a pivot into the cloud tenant.

## Prerequisite
Admin access to the Connect server.
