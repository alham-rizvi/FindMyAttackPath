---
id: adcs_esc5
type: technique
label: "AD CS ESC5 (PKI object permissions)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Audit security descriptors and writes on enterprise PKI configuration objects, CA objects, OIDs and trust stores."
mitre: "T1649"
tag: null
---


# AD CS ESC5 (PKI object permissions)

### Affected object / attribute
**PKI objects**: CA object, OID containers, **`NTAuthCertificates`**, and the `CN=Public Key Services` subtree.

### Concept (deep)
Weak ACLs on PKI objects allow the attacker to **alter trust** or enrol as anyone. The discipline is the same as ESC4: **modify → exploit → restore**.

### Commands
```bash
