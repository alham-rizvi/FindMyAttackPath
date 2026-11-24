---
id: adcs_esc1
type: technique
label: "ADCS ESC1"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Certificate issuance (4886/4887) for an unexpected UPN."
mitre: "T1649"
tag: null
---
A template lets the enrollee set an arbitrary SAN with client-auth EKU, so you request a certificate as any user — Domain Admin included.

## Prerequisite
Enrollment rights on a vulnerable template.

## How it works

ESC1 is a certificate-template misconfiguration in which an enrollee may control identity information in a certificate request while the template permits authentication use. If the certificate authority issues such a certificate, it can represent an identity different from the requester. Exploitability depends on template flags, enrollment rights, issuance controls, and how the certificate maps to an account.

## Defensive checks

Disable requester-supplied subject names for authentication templates unless required, restrict enrollment to intended groups, and use approval or authorized-signature requirements for sensitive issuance. Review CA request and issuance events for unexpected subject names or UPNs, and audit template changes.

## References

- [MITRE ATT&CK: Steal or Forge Authentication Certificates](https://attack.mitre.org/techniques/T1649/)
- [Microsoft: Certificate templates](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [SpecterOps: Certified Pre-Owned](https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf)
