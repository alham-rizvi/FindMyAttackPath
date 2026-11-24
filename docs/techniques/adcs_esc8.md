---
id: adcs_esc8
type: technique
label: "ADCS ESC8 (NTLM relay to CA web enrollment)"
phase: "privesc"
tools: ["impacket", "petitpotam", "coercer", "certipy"]
cve: null
detect: "Certificate issuance outside normal workflow; relay traffic to /certsrv/."
mitre: "T1649"
tag: null
---
Coerce a DC to authenticate, then relay that authentication into the AD CS HTTP enrollment endpoint to issue a DC-identity certificate.

## Prerequisite
Web enrollment reachable without Extended Protection; a coercion primitive.

## How it works

ESC8 combines an AD CS web-enrollment endpoint that accepts NTLM authentication with a relayable authentication exchange. If a privileged account is induced to authenticate and the endpoint lacks protections that bind authentication to the TLS channel or service, the request may be processed as that account. The resulting certificate's authority depends on the template and CA policy; relayability alone does not guarantee a privileged certificate.

## Defensive checks

Disable unused HTTP enrollment endpoints, require HTTPS and Extended Protection for Authentication, reduce NTLM, and review certificate templates and enrollment permissions. Monitor CA request/issuance events and correlate them with inbound authentication to enrollment services; investigate issuance that does not match an expected requester or workflow.

## References

- [MITRE ATT&CK: Steal or Forge Authentication Certificates](https://attack.mitre.org/techniques/T1649/)
- [Microsoft: Active Directory Certificate Services overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [SpecterOps: Certified Pre-Owned](https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf)
