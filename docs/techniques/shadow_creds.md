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
Add an attacker-controlled key to msDS-KeyCredentialLink on a target object, then authenticate as it via PKINIT.

## Prerequisite
Write access to the target's msDS-KeyCredentialLink attribute.

## How it works

The msDS-KeyCredentialLink attribute can hold public-key credential information used by Windows Hello for Business and related key-based authentication. If an unauthorized principal can add a key credential to another account, that key may provide an alternate authentication route for the account. The risk depends on directory permissions, the target's authentication configuration, and whether the change is noticed and removed.

## Defensive checks

Protect the attribute with narrowly scoped ACLs and audit changes to it, especially on privileged accounts and computer objects. Alert on unexpected key-credential additions or removals, correlate with subsequent certificate-based Kerberos activity, and verify that approved Windows Hello enrollment flows remain functional.

## References

- [MITRE ATT&CK: Modify Authentication Process](https://attack.mitre.org/techniques/T1556/)
- [Microsoft: Windows Hello for Business](https://learn.microsoft.com/windows/security/identity-protection/hello-for-business/)
- [Microsoft Open Specifications: Active Directory Technical Specification](https://learn.microsoft.com/openspecs/windows_protocols/ms-adts/)
