---
id: golden_cert
type: technique
label: "Golden certificate (CA key theft)"
phase: "persist"
tools: ["forgecert", "certipy"]
cve: null
detect: "Certificate issuance that bypasses the normal CA request workflow."
mitre: "T1649"
tag: null
---
Steal or forge the enterprise CA's signing key to mint a trusted certificate for any user, surviving password resets.

## Prerequisite
Compromise of the CA server or its private key.
