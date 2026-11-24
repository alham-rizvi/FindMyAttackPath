---
id: skeleton_key
type: technique
label: "Skeleton key"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "LSASS memory modification on a DC — rare, very high-signal."
mitre: "T1556.001"
tag: null
---
Patch a live domain controller's LSASS so one master password authenticates as any domain account, alongside each account's real password.

## Prerequisite
Local admin on a domain controller.

## How it works

This technique modifies authentication behavior on a domain controller so that a backdoor secret may be accepted alongside normal account credentials. It depends on privileged access to a domain controller and modification of security-sensitive authentication components. Because it changes a live identity authority, impact may span many domain services.

## Defensive checks

Protect domain controllers with strict administrative tiering, application control, and endpoint monitoring for unexpected LSASS or authentication-package modification. Compare system files and authentication behavior with a known-good baseline, and investigate unexplained successful logons. Recovery may require rebuilding or restoring a trusted domain controller, not only resetting user passwords.

## References

- [MITRE ATT&CK: Patch System Image](https://attack.mitre.org/techniques/T1554/)
- [Microsoft: Protecting domain controllers](https://learn.microsoft.com/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory)
