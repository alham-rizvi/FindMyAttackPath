---
id: nopac
type: technique
label: "noPac (sAMAccountName spoofing)"
phase: "privesc"
tools: ["impacket", "rubeus", "powermad"]
cve: "cve-2021-42287"
detect: "4769 showing sAMAccountName/dNSHostName spoofing."
mitre: "T1558"
tag: "new"
---
Rename a controlled machine account to collide with a domain controller's name, then exploit S4U2Self for a Domain-Admin-equivalent ticket.

## Prerequisite
Ability to create or control a computer account.

## How it works

NoPac refers to a chain involving flaws in how certain Active Directory domain-controller account names are handled during Kerberos authentication. In affected, unpatched environments, control of a computer account can combine with account-name confusion to obtain authentication material associated with a domain controller. The chain depends on specific patch state and configuration; creating a computer account alone does not provide domain administrator access.

## Defensive checks

Apply the security updates addressing CVE-2021-42278 and CVE-2021-42287 across domain controllers, monitor unusual computer-account renames and Kerberos service-ticket patterns, and investigate unexpected authentication as a DC identity. Restrict computer-object creation and review its owner and attributes.

## References

- [Microsoft Security Update Guide: CVE-2021-42287](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-42287)
- [Microsoft Security Update Guide: CVE-2021-42278](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-42278)
- [MITRE ATT&CK: Steal or Forge Kerberos Tickets](https://attack.mitre.org/techniques/T1558/)
