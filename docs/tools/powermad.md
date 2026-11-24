---
id: powermad
type: tool
label: "Powermad"
repo: "Kevin-Robertson/Powermad"
category: "Privilege Escalation"
---

## Overview

**Powermad** is a privilege escalation tool. MachineAccountQuota abuse and computer-object creation.

Dual-use: Powermad should be used only within an approved scope. This page describes the project at a functional level and does not assert that an individual finding is exploitable.

## High-level capabilities

It can manipulate security-sensitive objects or delegation relationships. Its normal use is authorized validation of write rights and privilege boundaries in a lab or controlled engagement. Exact feature coverage and supported protocols depend on the project release and target platform.

## Safe authorized assessment and defensive use

Use Powermad for authorized validation of write rights and privilege boundaries in a lab or controlled engagement where organizational rules of engagement expressly permit it. Prefer read-only collection and recorded scope; isolate any test that changes objects, creates authentication events, modifies policy, acquires credentials or certificates, or reaches a callback or listener host. Review source code and community builds as untrusted software before deployment.

## Prerequisites and operating boundaries

A valid authorized account or test identity, network reachability to the intended systems, and permissions matching the planned read or validation operation are required. Operating-system version, domain or tenant configuration, endpoint controls, signing or channel binding, licensing, and protocol support can limit behavior. Preserve evidence and secrets securely, and use a lab or non-production environment for any action that could alter or disrupt the target.

## Observable behavior and defensive considerations

Potentially observable activity includes directory writes, ACL changes, authentication, and endpoint policy or service activity. Exact logs vary by Windows, AD, Entra, and tool configuration. Correlate collection windows, source accounts, host names, target objects, and timestamps with SIEM, directory, CA, authentication, endpoint, and network telemetry. Excessive collection or listener activity can itself create availability or detection noise.

## Limitations

Limitations include object rights and replication do not prove that a full privilege path is usable. The tool does not prove impact by itself, cannot replace effective-ACL or trust-boundary review, and may have false positives or false negatives. Validate findings against current vendor behavior and current project documentation.

## References

- [Project repository: Powermad](https://github.com/Kevin-Robertson/Powermad)
- [MITRE ATT&CK](https://attack.mitre.org/)
- [Microsoft Learn: Windows Server security and identity documentation](https://learn.microsoft.com/windows-server/identity/)
