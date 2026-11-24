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

Pass-the-hash authenticates to NTLM-capable services using an NTLM key in place of the plaintext password. It is separate from Kerberos ticket and local privilege outcomes.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

NTLM key/verifier, logon session, account SID/groups, NTLMSSP, SMB/RPC/WinRM/HTTP target, remote UAC, signing and target ACL are relevant.

## Prerequisite chain

A current account key, network reachability and a target that accepts NTLM for that account are required. The target authorizes the account and operation independently.


## Impact limits and failure cases

Remote UAC, NTLM policy, SMB signing/EPA, account type/state, domain trust, credential protection and target ACL limit impact. Hash material may be stale or domain/local constrained.

## Detection and validation

Correlate 4624 type 3 NTLMSSP, 4776 validation, source/target, unexpected interactive context and subsequent SMB/RPC/WinRM activity. Baseline normal service authentication.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Disable NTLM where compatible, enforce SMB signing/EPA and tiered privileged logons, enable Credential Guard and remote-UAC controls.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1550.002](https://attack.mitre.org/techniques/T1550.002/)
