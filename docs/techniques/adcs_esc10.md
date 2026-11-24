---
id: adcs_esc10
type: technique
label: "AD CS ESC10 (weak certificate mapping)"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Review domain-controller certificate-mapping policy, compatibility exceptions and authentication events involving certificates."
mitre: "T1649"
tag: null
---


# AD CS ESC10 (weak certificate mapping)

### Affected object / attribute
**DC registry `StrongCertificateBindingEnforcement = 0`**.

### Concept (deep)
**Weak certificate mapping** on the DC. Same UPN-spoof chain as ESC9, **template-independent**. The root cause is the registry value, not the template.

### Commands
```bash
