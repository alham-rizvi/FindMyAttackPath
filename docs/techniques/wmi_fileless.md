---
id: wmi_fileless
type: technique
label: "Fileless WMI event-subscription execution"
phase: "lateral"
tools: []
cve: null
detect: "WMI permanent-subscription creation events."
mitre: "T1546.003"
tag: null
---

# Fileless WMI event-subscription execution

A WMI permanent subscription persists an EventFilter, EventConsumer and FilterToConsumerBinding. It is a management feature as well as a persistence candidate.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

WMI namespace/repository, `__EventFilter`, `__EventConsumer`, `__FilterToConsumerBinding`, event trigger, consumer/script capability, WMI service and namespace write ACL are relevant.

## Prerequisite chain

Write rights to the namespace and a supported event/consumer combination are required. The WMI service and consumer/script capability must be available and the event must occur.


## Impact limits and failure cases

Namespace ACL, OS/build, EDR, script policy, event availability, reboot/service state and consumer type determine execution/persistence. Repository objects alone do not prove execution.

## Detection and validation

Audit WMI-Activity/repository changes and Sysmon/equivalent WMI event IDs; correlate filter, consumer and binding creation with script/process/WMI activity.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict WMI write rights, use application control/EDR and monitor repository changes.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: Windows authentication overview](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview)
- [Microsoft: SMB security](https://learn.microsoft.com/windows-server/storage/file-server/smb-security)
- [MITRE ATT&CK: T1546.003](https://attack.mitre.org/techniques/T1546/003/)
