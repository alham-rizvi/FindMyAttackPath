---
id: initial
type: phase
label: "Initial Access & Foothold"
---


# Initial Access & Foothold

### Objective
Obtain the first valid credential or session without privileges.

### Attack surface
Username harvesting → **password spraying** (respect lockout policy) → **AS-REP roasting** → **anonymous LDAP/SMB** → **LLMNR/NBT-NS poisoning + relay**.

### Exhaustive commands
```bash
