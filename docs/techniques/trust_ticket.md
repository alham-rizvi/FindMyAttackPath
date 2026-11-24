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

# Inter-forest trust-ticket abuse

Inter-realm trust-ticket abuse concerns tickets crossing domain/forest trust boundaries using trust-key/referral relationships.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Trust account/key, TGT/referral/TGS, PAC, domain/forest SID filtering/quarantine, trust direction/type, selective authentication, target SPN and resource ACL are relevant.

## Prerequisite chain

The trust key/equivalent privileged context and a target domain/service that accepts crossing tickets are required. The ticket must represent an authorized SID and target context.


## Impact limits and failure cases

Trust key state, SID filtering, selective auth, lifetime, clock, account state and resource ACL limit impact. Enumerating a trust does not prove ticket or resource authorization.

## Detection and validation

Correlate cross-realm 4769/4776/4624, trust object/key changes, source/target DC/SPN and resource access. Alert on filtering or PAC/SID anomalies, not trust traffic alone.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove obsolete/broad trusts, protect trust keys and tune SID filtering/selective auth.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1482](https://attack.mitre.org/techniques/T1482/)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
