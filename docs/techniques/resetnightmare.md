---
id: resetnightmare
type: technique
label: "ResetNightmare"
phase: "privesc"
tools: []
cve: "cve-2026-27912"
detect: "4724 password-reset events correlated with anomalous kpasswd traffic."
mitre: "T1098"
tag: "new"
---
A validation flaw in the Kerberos change-password protocol lets you reset another account's password — Domain Admin included — without knowing the current one.

## Prerequisite
Network access to a domain controller and a controlled account to initiate the exchange.
