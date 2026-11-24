---
id: machineaccountquota
type: technique
label: "MachineAccountQuota abuse"
phase: "privesc"
tools: ["powermad", "impacket"]
cve: null
detect: "Unusual volume of computer-object creation from one user."
mitre: "T1136.002"
tag: null
---

# MachineAccountQuota abuse

MachineAccountQuota controls ordinary users’ ability to create computer objects. Creation alone is only a directory event and not a privilege escalation.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

The `ms-DS-MachineAccountQuota` value, computer object and OU/container create rights, sAMAccountName/dNSHostName/SPNs, DNS update rights and downstream delegation/state are relevant.

## Prerequisite chain

A domain user needs remaining MAQ capacity and an OU/container that allows computer creation. Naming/DNS policy may additionally apply. Another trust or authorization change is required for practical impact.


## Impact limits and failure cases

MAQ value, OU ACL, collisions, DNS/SPN policy, join process and downstream ACL determine whether creation creates usable identity. Most tool reports should stop at object creation if no further relationship exists.

## Detection and validation

Audit 4741 computer creation from unusual users/hosts, MAQ/OU ACL changes, SPN/DNS additions and downstream delegation/group changes. Baseline join tooling and helpdesk workflows.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Set conservative MAQ only with compatibility review, restrict OU/create-object rights, require controlled join workflows and monitor computer objects.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1136.002](https://attack.mitre.org/techniques/T1136.002/)
