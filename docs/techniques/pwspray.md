---
id: pwspray
type: technique
label: "Password spraying"
phase: "initial"
tools: ["kerbrute", "netexec"]
cve: null
detect: "4625 bursts across many accounts from one source."
mitre: "T1110.003"
tag: null
---
Try one or two common passwords across many accounts to stay under lockout thresholds.

## Prerequisite
A valid username list.

## How it works

Instead of repeatedly guessing one account's password, this technique tests a small set of guesses against many identities. A successful authentication can provide an initial foothold, while failed attempts can still create lockouts or service disruption. It depends on a valid identity population and weak or reused passwords; it is not a vulnerability in the authentication protocol itself.

## Defensive checks

Use long, unique passwords and phishing-resistant authentication where practical. Correlate failures across accounts and source hosts, alert on broad account targeting followed by a success, and use identity-protection controls that do not rely only on per-account lockout thresholds. Authorized password audits should use approved test accounts and change windows.

## References

- [MITRE ATT&CK: Password Spraying](https://attack.mitre.org/techniques/T1110/003/)
- [Microsoft: Protect against password spray attacks](https://learn.microsoft.com/entra/architecture/security-operations-user-accounts)
