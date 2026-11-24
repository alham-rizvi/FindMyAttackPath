---
id: golden_cert
type: technique
label: "Golden certificate (CA key theft)"
phase: "persist"
tools: ["forgecert", "certipy"]
cve: null
detect: "Certificate issuance that bypasses the normal CA request workflow."
mitre: "T1649"
tag: null
---
Steal or forge the enterprise CA's signing key to mint a trusted certificate for any user, surviving password resets.

## Prerequisite
Compromise of the CA server or its private key.

## How it works

An enterprise CA's private signing key can issue certificates that the domain may trust for authentication. If that key is stolen, certificates may be created outside the normal enrollment workflow and may remain useful until the CA trust or key is revoked and dependent systems process the change. The compromise is distinct from a vulnerable template: it targets the CA's signing authority itself.

## Defensive checks

Store CA private keys in protected hardware where practical, strictly limit CA administration, monitor key access and CA configuration, and maintain tested certificate-revocation and CA-recovery procedures. Investigate authentication certificates that have no matching CA request record and coordinate trust updates across relying systems.

## References

- [MITRE ATT&CK: Steal or Forge Authentication Certificates](https://attack.mitre.org/techniques/T1649/)
- [Microsoft: Active Directory Certificate Services overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
