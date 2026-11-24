---
id: ntlm_reflection
type: technique
label: "NTLM reflection"
phase: "initial"
tools: ["impacket", "petitpotam"]
cve: "cve-2025-33073"
detect: "Correlate SMB access-control, authentication, network-logon, endpoint, and patch telemetry; do not treat loopback or relay events as proof of CVE-2025-33073."
mitre: "T1557.001"
tag: "new"
---

# NTLM reflection

CVE-2025-33073 is publicly described as improper access control in Windows SMB that can allow an authorized network attacker to elevate privileges. The NVD/MSRC summary does not establish reflection or loopback mechanics by itself.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

The public scope concerns Windows SMB access control and affected build state. SMB authentication/session, network logon, account privilege, share/endpoint authorization and patch state are the practical review objects; reflection/relay is unconfirmed.

## Prerequisite chain

The exact Microsoft advisory must confirm the build is affected, the actor must have the described authorized network position, and the specific SMB access-control boundary must be reachable.


## Impact limits and failure cases

Patch/build, network position, account rights, SMB policy/signing and target authorization determine impact. The public summary does not prove NTLM reflection, loopback or relay.

## Detection and validation

Correlate SMB access-control, network-logon 4624/4769 as applicable, share/endpoint authorization, patch state and network flows. Do not treat loopback or relay event patterns as standalone CVE proof.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Apply the exact Microsoft patch guidance, restrict SMB exposure and enforce least privilege/signing.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [NVD: CVE-2025-33073](https://nvd.nist.gov/vuln/detail/CVE-2025-33073)
- [Microsoft Security Update Guide: CVE-2025-33073](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-33073)
- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1557.001](https://attack.mitre.org/techniques/T1557.001/)
