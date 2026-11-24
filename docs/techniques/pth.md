---
id: pth
type: technique
label: "Pass-the-hash"
phase: "lateral"
tools: ["impacket", "netexec", "crackmapexec"]
cve: null
detect: "4624 type 3 with NTLMSSP and no matching interactive logon."
mitre: "T1550.002"
tag: null
---


# Pass-the-hash

### Affected object / attribute
**NTLM authentication** — the NT hash is the credential.

### Concept (deep)
NTLM auth accepts the **NT hash** directly — no cracking needed. Works where NTLM is allowed; blocked by Kerberos-only or `RestrictNTLM`.

### Commands
```bash
