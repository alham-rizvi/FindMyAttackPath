---
id: adcs_esc17
type: technique
label: "AD CS ESC17 (Server Auth + enrollee-supplied SAN)"
phase: "privesc"
tools: ["certipy"]
cve: null
detect: "Certificate issuance (4886/4887) for a Server Authentication template where the requester supplied the SAN, especially for internal infrastructure hostnames (e.g. WSUS)."
mitre: "T1649"
tag: "new"
---

# AD CS ESC17 (Server Auth + enrollee-supplied SAN)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Status
Emerging/placeholder entry (added in the open PR). Track SpecterOps/Certipy research. When confirmed, fill the six-part body and update `adcs_esc_matrix.md`. Do **not** fabricate exploitation steps.

---

## References

- [ESC17 write-up: the WSUS/DNS abuse chain](https://mustafanafizdurukan.github.io/posts/esc17-wsus-dns-abuse)
- [Certipy pull request proposing ESC17](https://github.com/ly4k/Certipy/pull/344)
- [Microsoft: Certificate template concepts](https://learn.microsoft.com/windows-server/identity/ad-cs/certificate-template-concepts)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
