---
id: adcs_enum
type: technique
label: "ADCS template & CA enumeration"
phase: "recon"
tools: ["certipy", "certify"]
cve: null
detect: "LDAP reads of pKICertificateTemplate objects."
mitre: "T1649 (precursor)"
tag: null
---
Map certificate templates and CA permissions for ESC-class misconfigurations.

## Prerequisite
Any domain user.

## How it works

Certificate templates describe who may enroll, what identity information can be supplied, and which uses a certificate permits. Enumeration compares those settings with CA publication and access-control configuration to identify templates that may allow unintended authentication or privilege. A suspicious template is a configuration finding; impact still depends on enrollment access, CA policy, and the certificate's effective identity.

## Defensive checks

Inventory published templates and review enrollment rights, subject-name controls, authentication EKUs, issuance requirements, and CA web-enrollment exposure. Alert on unexpected template or CA configuration changes, and remove or correct templates that grant more authority than their business purpose requires.

## References

- [MITRE ATT&CK: Steal or Forge Authentication Certificates](https://attack.mitre.org/techniques/T1649/)
- [Microsoft: Certificate templates](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [SpecterOps: Certified Pre-Owned](https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf)
