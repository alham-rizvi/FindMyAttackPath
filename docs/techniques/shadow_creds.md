---
id: shadow_creds
type: technique
label: "Shadow Credentials attack"
phase: "privesc"
tools: ["whisker", "pywhisker", "certipy", "pkinittools"]
cve: null
detect: "5136 on msDS-KeyCredentialLink."
mitre: "T1556"
tag: "new"
---

# Shadow Credentials attack

Shadow Credentials concerns an unauthorized public key added to `msDS-KeyCredentialLink`, potentially affecting Windows Hello or related key authentication flows.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Target user/computer object, `msDS-KeyCredentialLink`, key identifier/public key, DC/schema support, PKINIT or Entra key sign-in, account state, key/tenant policy and private-key platform context are involved.

## Prerequisite chain

Write/control rights on the target attribute and a supported key authentication path plus matching private-key context are required. The target KDC/tenant must accept the key.


## Impact limits and failure cases

Schema/OS support, account type, MFA/CA, key type/lifecycle, device and tenant policy determine impact. Attribute presence or a public key does not prove sign-in acceptance.

## Detection and validation

Audit 5136/4662 writes to KeyCredentialLink and subsequent PKINIT/Entra key sign-ins, key registration and target account anomalies.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict object write rights and monitor key-credential changes, remove stale keys and tier key-authenticated identities.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: AD CS overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [Microsoft: Microsoft Entra identity documentation](https://learn.microsoft.com/entra/identity/)
- [Microsoft: Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)
- [MITRE ATT&CK: T1556](https://attack.mitre.org/techniques/T1556/)
