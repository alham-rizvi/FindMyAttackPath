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

## How it works

This entry describes a reported validation issue in the Kerberos password-change flow. Under the affected conditions, an account that can reach the relevant service may be able to cause a password change without the intended proof of authorization. The specific affected versions, protocol preconditions, and fix are advisory-dependent; confirm them against the vendor bulletin rather than assuming all domain controllers are exposed.

## Defensive checks

Apply the vendor's update for affected systems, restrict network exposure to domain controllers, and monitor password-change events for unexpected targets or source identities. Investigate related Kerberos password-service traffic and correlate it with directory changes. Follow the advisory's mitigation guidance if patching is not immediately possible.

## References

- [NVD: CVE-2026-27912](https://nvd.nist.gov/vuln/detail/CVE-2026-27912)
- [Microsoft Security Response Center](https://msrc.microsoft.com/)
- [MITRE ATT&CK: Account Manipulation](https://attack.mitre.org/techniques/T1098/)
