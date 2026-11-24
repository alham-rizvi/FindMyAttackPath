---
id: adcs_esc9
type: technique
label: "AD CS ESC9 (missing security extension)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review template security-extension flags, certificate contents and domain-controller certificate mapping policy."
mitre: "T1649"
tag: null
---


# AD CS ESC9 (missing security extension)

### Affected object / attribute
**Template flag `CT_FLAG_NO_SECURITY_EXTENSION`** and **weak `szOID_NTDS_CA_SECURITY_EXT` mapping**.

### Concept (deep)
The certificate lacks the **SID security extension**. With weak UPN mapping, the attacker **renames a controlled user’s UPN** to `administrator@corp.local`, requests a certificate, then reverts. **Mitigated by KB5014754 full enforcement** (September 2025) — verify the DC registry `StrongCertificateBindingEnforcement`.

### Commands
```bash
