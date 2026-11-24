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

# DPAPI / credential-vault decryption

DPAPI protects application and Windows Vault data using user or machine master-key state. It is not a universal store of plaintext credentials and depends on principal context.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

DPAPI master keys, user/SYSTEM/SID context, profile and logon state, Credential Vault/browser/application blobs, certificate stores, recovery keys and Credential Guard/HVCI state are involved.

## Prerequisite chain

The protected artifact and the user/machine key context needed to unwrap it must be accessible. Local admin or SYSTEM does not guarantee decryption under modern host/account protections.


## Impact limits and failure cases

Password/key rotation, domain backup/recovery keys, TPM, LSA protection, logon state, application format and network-backed service secrets can prevent or narrow recovery.

## Detection and validation

Monitor LSASS/profile/master-key/registry access, hive backup, browser or Vault access and DPAPI API use by unusual processes. Correlate process and security-product events rather than a blob read alone.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Use supported host credential isolation, restrict privileged host access and recovery keys, protect application secrets and tier administrators.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1555](https://attack.mitre.org/techniques/T1555/)
