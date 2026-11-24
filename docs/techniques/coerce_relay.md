---
id: coerce_relay
type: technique
label: "Coerced authentication → NTLM relay"
phase: "initial"
tools: ["petitpotam", "coercer", "shadowcoerce", "dfscoerce", "impacket", "responder", "mitm6"]
cve: null
detect: "4624 type 3 from a machine account; unexpected outbound auth from a server."
mitre: "T1187 / T1557.001"
tag: null
---

# Coerced authentication → NTLM relay

Coercion causes a Windows principal to authenticate, while relaying forwards that exchange to a target service rather than answering for the principal. The target must accept the exchange and authorize a meaningful operation.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Relevant endpoints use SMB/RPC/HTTP/WebDAV or management protocols. NTLM signing, SMB/LDAP signing, EPA, channel binding, DNS/SPN identity, machine/user account state and target ACLs determine whether the exchange remains bound to the intended service.

## Prerequisite chain

The source principal must be inducible in an authorized lab, the initiating protocol must reach the assessed listener, and the target must accept the relayed authentication and permit an operation.


## Impact limits and failure cases

Signing, EPA, channel binding, NTLM restrictions, Kerberos, network segmentation, account restrictions and patch state commonly stop or narrow the chain. One inbound authentication event is not relay or privilege success.

## Detection and validation

Correlate unexpected outbound auth by servers, 4624 type 3 source anomalies, SMB/RPC/HTTP traffic, DNS/SPN, target service operations and account changes. Baseline backup, discovery and management paths.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Enable required signing and EPA/channel binding, disable unnecessary coercible features, restrict management paths and NTLM where feasible, and isolate privileged machine/service accounts.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1187](https://attack.mitre.org/techniques/T1187/)
- [MITRE ATT&CK: T1557.001](https://attack.mitre.org/techniques/T1557/001/)
