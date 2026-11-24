---
id: trust_ticket
type: technique
label: "Inter-forest trust-ticket abuse"
phase: "hybrid"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4769 for a cross-realm TGS."
mitre: "T1482 / T1558"
tag: null
---
Forge an inter-realm TGT using a trust key to reach resources in a trusting forest.

## Prerequisite
The trust account's NTLM hash.

## How it works

Inter-forest Kerberos trusts use shared trust secrets to protect cross-realm authentication. If a trust secret is compromised, forged inter-realm tickets may be presented across the trust, subject to trust direction, SID filtering, selective authentication, and resource permissions. The trust relationship does not make every identity an administrator in the other forest.

## Defensive checks

Protect and periodically rotate trust secrets using supported procedures, keep trust scope narrow, and verify SID filtering and selective authentication. Monitor cross-realm ticket activity and unusual group or SID claims, and investigate the source forest as well as the target.

## References

- [MITRE ATT&CK: Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)
- [Microsoft: Forest trusts](https://learn.microsoft.com/windows-server/identity/ad-ds/plan/forest-design-models)
