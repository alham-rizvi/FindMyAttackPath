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

# Golden certificate (CA key theft)

A golden certificate is an illicit certificate issued with enterprise CA signing authority, bypassing normal request/workflow assumptions rather than exploiting a template attribute alone.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Enterprise CA private key/signing authority, key protection/HSM, CA certificate/chain, templates/issuance policy, request database and audit, validity/EKU, CRL/OCSP and relying-party trust are central.

## Prerequisite chain

Usable CA private key or signing capability for the relevant chain is required. Copying a public CA certificate or an ordinary certificate is insufficient; the relying party must trust the chain and purpose.


## Impact limits and failure cases

HSM/TPM/key exportability, template/EKU, validity, revocation, account state and offline/cached validation determine impact. Revocation may not remove every already accepted authentication context.

## Detection and validation

Correlate private-key access/export, CA host integrity, 4886/4887 issuance, certificates absent from expected templates/workflows, abnormal EKU/SAN/validity and relying-party authentication.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Protect CA hosts/private keys with HSM/TPM and tiered administration, disable unnecessary export, harden CA and monitor key/request/issuance use.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: AD CS overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
