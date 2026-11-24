---
id: adcs_enum
type: technique
label: "ADCS template & CA enumeration"
phase: "recon"
tools: ["certipy", "certify"]
cve: null
detect: "LDAP reads of pKICertificateTemplate objects."
mitre: "T1649 (precursor)"
tag: null
---


# ADCS template & CA enumeration

### Affected object / attribute
**`pKIEnrollmentService`** (CA objects), **`pKICertificateTemplate`** (templates), **CA registry flags**, **web enrolment endpoints**, and **`msDS-OIDToGroupLink`**.

### Concept (deep)
ADCS enumeration is the foundation of every ESC finding. A single `certipy find` reports CA flags, template settings, enrolment rights, and vulnerable ESC paths. The key is to review **CA-level flags independently of template flags** — a CA flag overrides every template on that CA.

### Exhaustive commands
```bash
