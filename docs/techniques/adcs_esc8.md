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

# ADCS ESC8 (NTLM relay to CA web enrollment)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**ADCS web-enrolment endpoint** (`/certsrv/`) — NTLM authentication.

## Detection
NTLM auth to `/certsrv` (IIS **4624 type 3**); **EPA** + disable NTLM on the enrolment site; **4886** for `DomainController` template issued to a non-DC.

---

## References

- [Microsoft: IIS Extended Protection](https://learn.microsoft.com/iis/configuration/system.webserver/security/authentication/extended-protection)
- [Microsoft: AD CS web enrollment](https://learn.microsoft.com/windows-server/identity/ad-cs/network-device-enrollment-service-overview)
- [Microsoft: AD CS overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
