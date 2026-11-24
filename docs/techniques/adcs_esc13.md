---
id: adcs_esc13
type: technique
label: "AD CS ESC13 (issuance-policy group mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review issuance-policy OID mappings and correlate issued policies with certificate-authentication and authorization decisions."
mitre: "T1649"
tag: null
---

# AD CS ESC13: issuance-policy group mapping

ESC13 concerns an issuance-policy object linked to a privileged group so that a certificate carrying the corresponding policy can influence authorization when accepted. This depends on the directory's OID-to-group configuration and the relying party's processing of the policy.

> **Authorized assessment only:** Inspect OID links and template policy read-only. Do not alter group links or issue test certificates in production.

## Conceptual path

```mermaid
flowchart LR
  A[Issuance-policy OID is linked to a group] --> B[Template and CA can issue that policy]
  B --> C[Principal is eligible for enrollment]
  C --> D[Relying party processes the certificate policy]
  D --> E[Authorization may include mapped group context]
```

## Conditions and limits

An OID-to-group link alone does not grant access. The certificate must carry the policy, issuance must be permitted, the chain must be trusted, and the relying party must honor the mapping. Verify actual group and authorization semantics rather than relying on a scanner label.

## Affected objects and fix

```text
Objects: msPKI-Enterprise-Oid object, msDS-OIDToGroupLink, and issuing templates
Settings to review: OID-to-group association, object ACLs, and templates that issue the policy
Risky state: Unapproved OID links to a privileged group or can be issued too broadly
Fix target: Remove unnecessary links; restrict OID/template writes and policy issuance
```

## Defensive review

Restrict writes to OID and group-link objects, document each mapping's owner and purpose, and limit template issuance of mapped policies. Review group membership and relying-party authorization together.

## Detection

Audit OID-object and group-link changes, template publication and CA issuance. Correlate certificate policy data with authentication and authorization events that show the mapped group context.

## References

- [AD CS ESC taxonomy overview](docs/techniques/adcs_esc_matrix.md)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
