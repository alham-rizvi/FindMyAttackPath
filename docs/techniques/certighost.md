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

# Certighost

CVE-2026-54121 is publicly described as improper authorization in Active Directory Certificate Services that could allow an authorized network attacker to elevate privileges. The public summary does not establish a certificate fallback, DC identity, coercion mechanism or named exploitation chain.

> **Authorized assessment only:** This guide is for controlled labs and explicitly authorized reviews. It provides no exploit, issuance or coercion procedure.

## CVE summary versus technique hypothesis

| Source | Confirmed scope |
| --- | --- |
| NVD | Improper authorization in AD CS; authorized network privilege escalation. |
| Microsoft MSRC | Authoritative affected builds, prerequisites and patch guidance; implementation detail should follow the vendor advisory. |
| This page | Only a bounded AD CS authorization hypothesis. It does not assert DC-identity issuance or CA-coercion/fallback behavior. |

## Objects and validation scope

Relevant objects are enterprise CA authorization, CA host/build state, enrollment interfaces, CA policy/template authorization, requester identity and certificate trust. Do not add `pKIEnrollmentService`, template, DC identity or issuance mechanics unless Microsoft/vendor evidence substantiates the exact condition.

## Prerequisite chain

Microsoft’s advisory must confirm that the Windows/AD CS build is affected. An authorized network position and reachable CA authorization boundary must exist. The public CVE summary alone does not establish template publication, DC identity, requester rights or a usable certificate outcome.

## Impact limits

Affected build, patch state, network position, CA authorization and the exact elevated operation determine impact. Certificate request or tool labels are not evidence of this CVE, and DC-identity issuance or coercion is unconfirmed.

## Detection and validation

Correlate AD CS authorization/configuration changes, requests and issuance, network access to CA interfaces, certificate trust/authentication and host patch state. The public summary provides no unique event signature; an event pattern from another AD CS technique is not evidence for this CVE.

## Mitigation and recovery

Apply Microsoft patch guidance for the exact build, restrict network exposure and CA/enrollment administration, review CA authorization and template least privilege. Preserve CA, host and network evidence if compromise is suspected; revoke or investigate certificates only when misuse is independently established, and retest in a lab.

## References

- [NVD: CVE-2026-54121](https://nvd.nist.gov/vuln/detail/CVE-2026-54121)
- [Microsoft Security Update Guide: CVE-2026-54121](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-54121)
- [Microsoft: AD CS overview](https://learn.microsoft.com/windows-server/identity/ad-cs/active-directory-certificate-services-overview)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
