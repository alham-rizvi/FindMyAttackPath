---
id: gpo_abuse
type: technique
label: "GPO abuse (writable linked policy)"
phase: "privesc"
tools: ["sharpgpoabuse", "gpoddity"]
cve: null
detect: "GPO edit events; new scheduled-task GPO content."
mitre: "T1484.001"
tag: null
---

# GPO abuse (writable linked policy)

A GPO can alter policy applied to users/computers. Abuse requires effective write/control over a GPO or link/container and an in-scope target that actually processes the policy.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

GPO container/gPC attributes, SYSVOL GPT.ini and policy files, OU/domain/site links, security filtering, WMI filters, loopback policy, item-level targeting and CSE policy state are relevant.

## Prerequisite chain

Write/control rights must reach a linked GPO or alter an effective link, and target computers/users must process the relevant CSE. A policy file change is not immediate application.


## Impact limits and failure cases

Link scope, precedence, filtering, loopback, refresh/replication, target OS/CSE and EDR can delay or block impact. The policy may not apply to every linked group or OU.

## Detection and validation

Audit GPO edits, 5136 gPLink/gPCFileSysPath changes, SYSVOL file edits, GP processing/application logs and new sensitive CSE content. Correlate author, GPO GUID, link and target host.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Remove broad GPO/link write rights, tier GPO administration, restrict SYSVOL/GPO ACLs, review filters and links, and require change approval.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1484.001](https://attack.mitre.org/techniques/T1484.001/)
