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
Temporarily register a rogue domain controller to push an attacker-chosen change into replication, bypassing normal AD audit logging.

## Prerequisite
Domain Admin-equivalent rights, plus rights to register a server as a DC.

## How it works

DCShadow abuses Active Directory's replication model by temporarily presenting a rogue system as a domain controller and submitting directory changes through replication mechanisms. Because the change path differs from ordinary LDAP writes, standard object-change auditing may not provide the expected evidence. The technique requires powerful directory privileges and careful investigation of replication metadata and DC registration.

## Defensive checks

Restrict domain-controller registration rights, monitor changes to server and replication metadata, and alert on replication partners or directory-service activity from unrecognized systems. Preserve replication state during incident response and compare domain-controller inventories against approved assets.

## References

- [MITRE ATT&CK: DCShadow](https://attack.mitre.org/techniques/T1207/)
- [Microsoft Open Specifications: Directory Replication Service Remote Protocol](https://learn.microsoft.com/openspecs/windows_protocols/ms-drsr/)
