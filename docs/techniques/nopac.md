---
id: nopac
type: technique
label: "noPac (sAMAccountName spoofing)"
phase: "privesc"
tools: ["impacket", "rubeus", "powermad"]
cve: "cve-2021-42287"
detect: "4769 showing sAMAccountName/dNSHostName spoofing."
mitre: "T1558"
tag: "new"
---

# noPac (sAMAccountName spoofing)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**`sAMAccountName`** on a machine account + **KDC PAC validation**.

## Detection
**4741+4781** within minutes; **4768** for a machine name equal to a DC; patch.

---

## References

- [NVD: CVE-2021-42287](https://nvd.nist.gov/vuln/detail/CVE-2021-42287)
- [Microsoft Security Update Guide: CVE-2021-42287](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-42287)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
