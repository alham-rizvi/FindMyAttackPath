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

## How it works

Pass-the-hash uses an NTLM password-derived hash as authentication material instead of first recovering the plaintext password. If the target accepts NTLM and the account has the required rights, the hash may authenticate to a remote service. It does not bypass authorization, and protections such as Credential Guard, NTLM restrictions, and administrative-tier separation can reduce exposure.

## Defensive checks

Reduce NTLM where operationally possible, use unique local administrator passwords, and prevent privileged identities from authenticating to untrusted hosts. Correlate NTLM logons with source host, account, logon type, and subsequent remote activity; investigate unusual reuse of one identity across many endpoints.

## References

- [MITRE ATT&CK: Pass the Hash](https://attack.mitre.org/techniques/T1550/002/)
- [Microsoft: NTLM overview](https://learn.microsoft.com/windows-server/security/kerberos/ntlm-overview)
- [Microsoft: Credential Guard overview](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/)
