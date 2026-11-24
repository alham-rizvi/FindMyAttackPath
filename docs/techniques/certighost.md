---
id: certighost
type: technique
label: "Certighost"
phase: "privesc"
tools: ["certipy"]
cve: "cve-2026-54121"
detect: "Correlate AD CS authorization/configuration changes, CA network access, certificate requests and issuance; no unique CVE event signature is established."
mitre: "T1649"
tag: "new"
---

# Certighost

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**ADCS enrolment endpoint / coercion path** (2025 research). **Verify against current research before operational use.**

## Detection
NTLM to CA endpoints; **4886** issued to a machine that did not request it.

---

## References

- [NVD: CVE-2026-54121](https://nvd.nist.gov/vuln/detail/CVE-2026-54121)
- [Microsoft Security Update Guide: CVE-2026-54121](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-54121)
- [Microsoft: AD CS overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
