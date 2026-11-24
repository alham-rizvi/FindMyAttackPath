---
id: adcs_esc8
type: technique
label: "ADCS ESC8 (NTLM relay to CA web enrollment)"
phase: "privesc"
tools: ["impacket", "petitpotam", "coercer", "certipy"]
cve: null
detect: "Certificate issuance outside normal workflow; relay traffic to /certsrv/."
mitre: "T1649"
tag: null
---
Coerce a DC to authenticate, then relay that authentication into the AD CS HTTP enrollment endpoint to issue a DC-identity certificate.

## Prerequisite
Web enrollment reachable without Extended Protection; a coercion primitive.
