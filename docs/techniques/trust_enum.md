---
id: trust_enum
type: technique
label: "Domain & forest trust mapping"
phase: "recon"
tools: ["powerview", "netexec"]
cve: null
detect: "Trust-object LDAP queries."
mitre: "T1482"
tag: null
---
Enumerate trust direction, transitivity and SID filtering to reveal cross-domain paths.

## Prerequisite
Any domain user.

## How it works

Trust objects describe how domains or forests recognize identities from one another. Mapping trust direction, scope, transitivity, and filtering helps defenders understand where authentication may cross administrative boundaries. The presence of a trust alone does not grant access: authorization, selective authentication, SID filtering, and resource permissions all matter.

## Defensive checks

Maintain an owner and business justification for every trust, periodically review its direction and scope, and validate SID-filtering and selective-authentication settings. Correlate cross-domain authentication with the source identity and destination resource rather than treating all trusted-domain traffic as benign.

## References

- [MITRE ATT&CK: Domain Trust Discovery](https://attack.mitre.org/techniques/T1482/)
- [Microsoft: Forest trusts](https://learn.microsoft.com/windows-server/identity/ad-ds/plan/forest-design-models)
