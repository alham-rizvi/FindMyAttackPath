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
Authenticate using an NTLM hash in place of the plaintext password.

## Prerequisite
A captured NTLM hash with rights on the target.
