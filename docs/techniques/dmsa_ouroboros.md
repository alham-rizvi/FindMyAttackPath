---
id: dmsa_ouroboros
type: technique
label: "dMSA Ouroboros credential extraction"
phase: "cred"
tools: []
cve: null
detect: "Directory-service access to dMSA attributes."
mitre: "T1003 (variant)"
tag: "new"
---
Abuse a delegated Managed Service Account's self-rotating design on Windows Server 2025 to repeatedly pull its current credential.

## Prerequisite
Rights over a dMSA object on a Server 2025 domain.
