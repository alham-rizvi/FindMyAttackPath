---
id: bloodhound_collect
type: technique
label: "BloodHound graph collection"
phase: "recon"
tools: ["bloodhound", "sharphound", "bloodhoundpy", "rusthound", "netexec", "goodhound", "improhound"]
cve: null
detect: "Collector execution; large LDAP/SMB session bursts; ZIP creation."
mitre: "T1087 / T1482"
tag: null
---
Build the full privilege-relationship graph and compute shortest paths to Tier-0 targets.

## Prerequisite
Domain credentials — often a standard user is enough.

## How it works

Collection tools query directory and host relationships and represent them as a graph: who can administer a computer, which groups control other groups, and which objects have delegated rights. Path analysis helps prioritize combinations of individually small permissions. A displayed path is a lead to validate, not proof that each edge is current, reachable, or exploitable.

## Defensive checks

Treat collected graphs as sensitive security data and protect them from broad access. Monitor unusually broad LDAP, SMB, and session-enumeration activity, collector execution, and staging of large result files. Reduce risky ACLs and validate high-impact paths with authorized, non-destructive checks.

## References

- [MITRE ATT&CK: Account Discovery](https://attack.mitre.org/techniques/T1087/)
- [BloodHound Community Edition](https://github.com/SpecterOps/BloodHound)
- [BloodHound documentation](https://bloodhound.specterops.io/)
