---
id: privesc
type: phase
label: "Domain Privilege Escalation"
---


# Domain Privilege Escalation

### Objective
Raise privilege on the current principal or the domain.

### Chain order
**ACL edges** → **ADCS ESC1–ESC16** → **delegation (RBCD/constrained)** → **DNSAdmins** → **GPO abuse** → **CVE (noPac/Zerologon/PrintNightmare)** only if in scope.

### Exhaustive commands
```bash
