---
id: certighost
type: technique
label: "Certighost"
phase: "privesc"
tools: ["certipy"]
cve: "cve-2026-54121"
detect: "Certificate request carrying a DC identity from a low-privileged requester."
mitre: "T1649"
tag: "new"
---
Abuses an AD CS enrollment fallback that coerces the CA into authenticating back to attacker infrastructure, then issues a certificate impersonating a domain controller.

## Prerequisite
A standard domain account and a reachable enterprise CA.
