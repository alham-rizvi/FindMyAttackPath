---
id: adcs_esc11
type: technique
label: "AD CS ESC11 (RPC enrollment relay exposure)"
phase: "privesc"
tools: ["certipy"]
cve: null
detect: "Review RPC enrollment privacy enforcement and correlate NTLM authentication, RPC enrollment traffic and CA issuance."
mitre: "T1649"
tag: null
---


# AD CS ESC11 (RPC enrollment relay exposure)

### Affected object / attribute
**CA RPC interface (ICertPassage)** — lack of packet integrity/privacy enforcement.

### Concept (deep)
The CA RPC interface does **not enforce packet integrity**. Relay NTLM over **RPC** to request certificates — effective where HTTP enrolment is disabled but RPC enrolment is exposed.

### Commands
```bash
