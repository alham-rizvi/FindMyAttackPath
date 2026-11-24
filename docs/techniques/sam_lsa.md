---
id: sam_lsa
type: technique
label: "SAM / LSA secrets dump"
phase: "cred"
tools: ["impacket"]
cve: null
detect: "Registry hive save/read events; VSS shadow-copy creation."
mitre: "T1003.002"
tag: null
---

# SAM / LSA secrets dump

SAM and LSA secrets are local Windows account/cache/service stores protected by host and registry security.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

SAM/SECURITY/SYSTEM hives, local account database, LSA secrets, cached domain logons, registry backup/VSS state and host key context are relevant.

## Prerequisite chain

Privileged or backup-style host access and the hive/key context required to interpret secrets are needed. Cached/domain material must remain valid and be accepted by the target.


## Impact limits and failure cases

Credential Guard, OS protection, account/cache state, password changes, VSS policy and target restrictions determine usability. Registry readability is not proof of credential reuse.

## Detection and validation

Monitor hive/registry save/read and VSS/snapshot activity, LSASS/registry process access, local account/secret changes and subsequent authentication.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict local admin/backup rights and host storage, enable supported protections and reduce cached/service secrets.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1003.002](https://attack.mitre.org/techniques/T1003.002/)
