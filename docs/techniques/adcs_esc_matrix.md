---
id: adcs_esc_matrix
type: technique
label: "AD CS ESC taxonomy overview"
phase: "privesc"
tools: ["certipy", "certify"]
cve: null
detect: "Correlate template, CA, PKI-object and certificate-mapping changes with CA issuance, IIS/RPC enrollment and certificate authentication."
mitre: "T1649"
tag: null
---


# AD CS ESC taxonomy overview

| ESC | Layer | Low-priv enrol? | Root cause | Mitigation |
|---|---|---|---|---|
| 1 | Template | yes | SAN supply + ClientAuth | Remove SAN flag; manager approval |
| 2 | Template | yes | Any Purpose EKU | Remove EKU |
| 3 | Template | yes | Agent EKU | Restrict agent templates |
| 4 | Template ACL | write | WriteOwner/WriteDacl | Baseline ACLs |
| 5 | PKI object ACL | write | Weak ACL | Restrict PKI writes |
| 6 | CA | yes | `EDITF_ATTRIBUTESUBJECTALTNAME2` | Clear flag + restart |
| 7 | CA role | yes | Manage CA/Certs | EA-only roles |
| 8 | Endpoint | coerced | NTLM on `/certsrv` | EPA + NTLM off |
| 9 | Template | yes | No SID extension | KB5014754 full enforcement |
| 10 | DC registry | yes | `StrongCertBinding=0` | Set to 2 |
| 11 | CA RPC | coerced | No packet integrity | `IF_ENFORCEENCRYPTICERTREQUEST` |
| 12 | CA host | shell | CA key + ESC6 flag | Tier-0 CA |
| 13 | Template/OID | yes | OID→group link | Remove privileged links |
| 14 | Template ACL | write | WriteProperty | Baseline ACLs |
| 15 | CA | yes | v1 template EKU manipulation | Patch / disable v1 |
| 16 | CA | yes | SID extension disabled | Remove from disable list |
| 17 | TBD | — | Track research | — |

---
