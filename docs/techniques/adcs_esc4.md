---
id: adcs_esc4
type: technique
label: "AD CS ESC4 (template ACL control)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Audit certificate-template owner, DACL, inherited rights and changes to security-sensitive template attributes."
mitre: "T1649"
tag: null
---

# AD CS ESC4: template ACL control

ESC4 describes a certificate template whose effective permissions allow an unintended principal to change security-relevant template settings. The risk is indirect: a principal with sufficient control may alter the issuance policy that the CA later applies.

> **Authorized assessment only:** Review permissions and configuration without changing a live template.

## Conceptual path

```mermaid
flowchart LR
  A[Template has excessive write or owner rights] --> B[Assessed principal can change policy]
  B --> C[CA publishes and applies the changed template]
  C --> D[Enrollment and identity conditions may change]
  D --> E[Validate impact only in an approved lab]
```

## Conditions and limits

Effective control depends on the template DACL, ownership, inheritance, nested groups, CA publication, replication and the exact attribute that can be changed. A writable template is not automatically exploitable; CA policy and relying-party behavior still matter.

## Affected object and fix

```text
Object: pKICertificateTemplate
Setting to review: nTSecurityDescriptor, owner, inherited ACEs, and write-property rights
Risky state: Non-PKI principals can change the template or its security descriptor
Fix target: Only designated PKI administrators can modify template policy or ACLs
```

## Defensive review

Resolve effective rights on every authentication-capable template, including inherited permissions and group nesting. Restrict owner, DACL and write-property rights to tiered PKI administrators. Remove unnecessary publication and compare settings with an approved baseline.

## Detection

Audit directory changes to `pKICertificateTemplate` objects, especially owner/DACL and identity, EKU, approval or enrollment flags. Correlate changes with CA issuance, replication and certificate-authentication activity.

## References

- [AD CS ESC taxonomy overview](docs/techniques/adcs_esc_matrix.md)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
