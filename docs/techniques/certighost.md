---
id: certighost
type: technique
label: "Certighost"
phase: "privesc"
tools: ["certipy"]
cve: "cve-2026-54121"
detect: "Certificate request carrying a DC identity from a low-privileged requester."
mitre: "T1649"
tag: "new"
---
Abuses an AD CS enrollment fallback that coerces the CA into authenticating back to attacker infrastructure, then issues a certificate impersonating a domain controller.

## Prerequisite
A standard domain account and a reachable enterprise CA.

## How it works

This entry describes a reported AD CS certificate-enrollment vulnerability in which particular CA fallback or enrollment behavior may cause an identity to be represented unexpectedly. The precise affected versions, prerequisites, and mitigations must be taken from the linked advisory and vendor update; the technique label alone is not enough to determine exposure. Do not infer that every enterprise CA or standard account is vulnerable.

## Defensive checks

Inventory affected CA versions and configurations, apply the vendor's security updates, and temporarily restrict exposed enrollment paths if the advisory recommends it. Review certificate request and issuance records for identities that do not match the requester, and validate the fix against the vendor's stated conditions.

## References

- [Microsoft Security Response Center](https://msrc.microsoft.com/)
- [NVD: CVE-2026-54121](https://nvd.nist.gov/vuln/detail/CVE-2026-54121)
- [MITRE ATT&CK: Steal or Forge Authentication Certificates](https://attack.mitre.org/techniques/T1649/)
