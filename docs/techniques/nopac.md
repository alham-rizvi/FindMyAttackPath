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
