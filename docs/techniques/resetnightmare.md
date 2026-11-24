---
id: resetnightmare
type: technique
label: "ResetNightmare"
phase: "privesc"
tools: []
cve: "cve-2026-27912"
detect: "Correlate Kerberos authorization, account-change, DC/endpoint and adjacent-network telemetry; do not treat 4724 or kpasswd activity as CVE proof."
mitre: "T1098"
tag: "new"
---

# ResetNightmare

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`pwdLastSet`** / victim password.

## Detection
**4723/4724** password changes by non-owner; **5136** `pwdLastSet` writes.

---

## References

- [NVD: CVE-2026-27912](https://nvd.nist.gov/vuln/detail/CVE-2026-27912)
- [Microsoft Security Update Guide: CVE-2026-27912](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-27912)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1098](https://attack.mitre.org/techniques/T1098/)
