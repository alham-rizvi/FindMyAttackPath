---
id: adcs_esc3
type: technique
label: "AD CS ESC3 (enrollment-agent policy)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Monitor enrollment-agent issuance, requester/subject differences, required signatures, and enrollment-agent template ACL changes."
mitre: "T1649"
tag: null
---

# AD CS ESC3: enrollment-agent policy

ESC3 concerns enrollment-agent certificates and the ability to request certificates on behalf of another identity. This is a legitimate delegated workflow when tightly controlled; it becomes a risk when enrollment-agent rights, target templates, or approval/signature controls are broader than the business process requires.

> **Authorized assessment only:** Do not perform on-behalf-of issuance against production identities without explicit written authorization.

## Conceptual path

```mermaid
flowchart LR
  A[Enrollment-agent template is available] --> B[Principal has agent enrollment rights]
  B --> C[Agent authority reaches a target template]
  C --> D[CA approval and signature policy allow issuance]
  D --> E[Relying party accepts the resulting identity]
```

## Conditions and limits

The agent certificate must be issued and accepted for the relevant workflow; the principal must have effective rights; the target template and CA must permit the delegated request; and the relying party must trust the chain and identity. Approval, authorized signatures, template restrictions and strong certificate mapping can break the path.

## Affected object and fix

```text
Objects: Enrollment-agent template, target templates, and their security descriptors
Settings to review: Enrollment-agent EKU, effective Enroll rights, issuance requirements
Risky state: Broad agent enrollment or delegated scope without required approval/signatures
Fix target: Documented agent roles, narrow target-template scope, and enforced approval policy
```

## Defensive review

Keep enrollment-agent templates unpublished when unused. Restrict agent enrollment and target-template rights to documented service roles, require appropriate authorized signatures or approval, and review whether the delegated scope is limited to expected identities and purposes.

## Detection

Correlate CA request/issuance events with agent identity, requested-for identity, template, approver, source host and later certificate authentication. Alert on unexpected requester/subject differences and changes to agent or target-template permissions.

## References

- [AD CS ESC taxonomy overview](docs/techniques/adcs_esc_matrix.md)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
