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

# ResetNightmare

CVE-2026-27912 is publicly described as improper authorization in Windows Kerberos that could allow an authorized attacker to elevate privileges over an adjacent network. NVD/MSRC summaries do not establish password-reset or kpasswd mechanics.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

The public scope is Windows Kerberos authorization and affected Windows/DC build state. Account-change 4724 or kpasswd traffic is not identified as a confirmed mechanism by the public summaries.

## Prerequisite chain

The Microsoft advisory must confirm the build, and an authorized adjacent-network position and reachable authorization condition must exist. An account-reset event alone is not CVE proof.


## Impact limits and failure cases

Affected build, network position, account authorization and exact privilege boundary determine impact. Password-reset, kpasswd or specific protocol chaining is not confirmed by current public summaries.

## Detection and validation

Correlate Kerberos authorization, account-change, DC/endpoint and adjacent-network telemetry. Do not use 4724 or kpasswd as a standalone detection rule for this CVE.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Apply exact Microsoft patch guidance and restrict adjacent-network/Kerberos administration.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [NVD: CVE-2026-27912](https://nvd.nist.gov/vuln/detail/CVE-2026-27912)
- [Microsoft Security Update Guide: CVE-2026-27912](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-27912)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1098](https://attack.mitre.org/techniques/T1098/)
