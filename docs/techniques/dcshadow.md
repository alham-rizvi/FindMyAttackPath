---
id: dcshadow
type: technique
label: "DCShadow"
phase: "persist"
tools: ["mimikatz"]
cve: null
detect: "Unexpected new DC registration; replication from an unrecognized server."
mitre: "T1207"
tag: null
---

# DCShadow

DCShadow is a replication-peer abuse concept: an illicit or test peer introduces directory changes that can look like replica synchronization.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

MS-DRSR replication RPC, DC registration and SPNs, naming contexts, replication metadata/source DC fields, replication rights and destination DC topology are involved.

## Prerequisite chain

The assessed context needs account/host rights to act as or register a replication peer and a DC that will accept and propagate the change. Ordinary directory write rights are not equivalent.


## Impact limits and failure cases

Replication topology, source/target DC recognition, RPC authentication, DRS ACL, object ACL, patch/forest policy and monitoring affect whether and how long a change propagates.

## Detection and validation

Monitor new DC/peer registrations, replication from non-DC sources, DRS RPC and replication metadata inconsistent with normal topology. Audit 4662 with replication GUIDs and correlate source host/account.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict DRS rights to DC/admin tiers, monitor DC registration/SPNs and replication topology, and tier DC administration.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/)
- [Microsoft: Security auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/security-auditing-overview)
- [MITRE ATT&CK: T1207](https://attack.mitre.org/techniques/T1207/)
