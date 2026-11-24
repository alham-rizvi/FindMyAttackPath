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

## How it works

Windows Data Protection API (DPAPI) protects application and user secrets using keys associated with a user or computer context. If an attacker obtains both protected data and the material needed to unlock the relevant master key, saved credentials or other application data may be exposed. A DPAPI blob alone is not normally enough to recover its plaintext.

## Defensive checks

Protect user profiles, backups, domain backup keys, and privileged logon sessions; remove unnecessary saved credentials and rotate secrets stored by applications. Monitor access to credential stores and unexpected profile or backup reads. Investigate the source context and whether the same secret is reused elsewhere.

## References

- [MITRE ATT&CK: Credentials from Password Stores](https://attack.mitre.org/techniques/T1555/)
- [Microsoft: CryptProtectData function](https://learn.microsoft.com/windows/win32/api/dpapi/nf-dpapi-cryptprotectdata)
