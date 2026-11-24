---
id: dmsa_ouroboros
type: technique
label: "dMSA Ouroboros credential extraction"
phase: "cred"
tools: []
cve: null
detect: "Directory-service access to dMSA attributes."
mitre: "T1003 (variant)"
tag: "new"
---


# dMSA Ouroboros credential extraction

### Affected object / attribute
**dMSA object** (`msDS-ManagedPassword`, key material) — Server 2025.

### Concept (deep)
A dMSA with **write rights on its own object** allows an attacker who controls it to **rewrite its key material** and extract credentials, or escalate via the dMSA’s privileges — a self-referential (“Ouroboros”) loop. **Emerging — verify against current research.**

### Detection
**5136** on dMSA objects modifying key material; dMSA created by non-tier-0 principals.

---
