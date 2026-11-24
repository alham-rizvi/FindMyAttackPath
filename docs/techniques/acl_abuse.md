---
id: acl_abuse
type: technique
label: "ACL abuse (GenericAll / WriteDACL / ForceChangePassword)"
phase: "privesc"
tools: ["bloodyad", "powerview", "impacket"]
cve: null
detect: "5136 — directory object modified."
mitre: "T1222 / T1098"
tag: null
---


# ACL abuse (GenericAll / WriteDACL / ForceChangePassword)

### Affected object / attribute
**`nTSecurityDescriptor`** on any AD object: domain root, users, computers, groups, OUs, GPOs, AdminSDHolder.

### Concept (deep)
AD ACLs are the **permissions layer** of AD. BloodHound visualises dangerous ACEs as edges. Abuse of `GenericAll`, `GenericWrite`, `WriteDacl`, `WriteOwner`, `AddMember`, `AddKeyCredentialLink`, `ReadLAPSPassword`, `ReadGMSAPassword` turns a low-priv principal into a privileged one **without exploitation**. The most impactful edge is **`WriteDacl` on the domain object**, which allows granting yourself **DCSync rights**.

### Attack flow (Mermaid)
```mermaid
flowchart TD
    A[BloodHound ACL edge] --> B{Which ACE?}
    B -->|WriteDacl on domain| C[Grant self DCSync]
    B -->|GenericAll on user| D[ForceChangePassword / Shadow Creds]
    B -->|GenericAll on computer| E[RBCD]
    B -->|AddMember on group| F[Join privileged group]
    B -->|WriteOwner| G[Take ownership → WriteDacl]
    C --> H[Domain compromise]
    D --> H
    E --> H
    F --> H
    G --> H
```

### Exhaustive commands
```bash
