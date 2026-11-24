---
id: ntlm_reflection
type: technique
label: "NTLM reflection"
phase: "initial"
tools: ["impacket", "petitpotam"]
cve: "cve-2025-33073"
detect: "Correlate SMB access-control, network-logon, share/endpoint authorization and patch telemetry; do not use loopback or relay patterns as CVE proof."
mitre: "T1557.001"
tag: "new"
---

# NTLM reflection

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**SMB authentication** on the target host.

## Detection
**SMB auth where client IP == server IP**; `RestrictNTLM`; SMB signing.

---

## References

- [NVD: CVE-2025-33073](https://nvd.nist.gov/vuln/detail/CVE-2025-33073)
- [Microsoft Security Update Guide: CVE-2025-33073](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-33073)
- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1557.001](https://attack.mitre.org/techniques/T1557/001/)
