---
id: dpapi
type: technique
label: "DPAPI / credential-vault decryption"
phase: "cred"
tools: ["mimikatz", "dploot", "donpapi"]
cve: null
detect: "DPAPI master-key access events."
mitre: "T1555"
tag: null
---
Decrypt saved browser passwords, Wi-Fi keys and Windows Vault entries.

## Prerequisite
User or admin context (locally or remotely over SMB/RPC).
