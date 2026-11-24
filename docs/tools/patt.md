---
id: patt
type: tool
label: "PayloadsAllTheThings"
repo: "swisskyrepo/PayloadsAllTheThings"
category: "Reference"
---

## Overview

**PayloadsAllTheThings** is a reference tool. Broad payload/technique reference, including an AD section.

PayloadsAllTheThings should be used only within an approved scope. This page describes the project at a functional level and does not assert that an individual finding is exploitable.

## High-level capabilities

It is a knowledge reference rather than a collector or execution engine. Its normal use is study, defensive planning, or test-plan preparation. Exact feature coverage and supported protocols depend on the project release and target platform.

## Safe authorized assessment and defensive use

Use PayloadsAllTheThings for study, defensive planning, or test-plan preparation where organizational rules of engagement expressly permit it. Prefer read-only collection and recorded scope; isolate any test that changes objects, creates authentication events, modifies policy, acquires credentials or certificates, or reaches a callback or listener host. Review source code and community builds as untrusted software before deployment.

## Prerequisites and operating boundaries

A valid authorized account or test identity, network reachability to the intended systems, and permissions matching the planned read or validation operation are required. Operating-system version, domain or tenant configuration, endpoint controls, signing or channel binding, licensing, and protocol support can limit behavior. Preserve evidence and secrets securely, and use a lab or non-production environment for any action that could alter or disrupt the target.

## Observable behavior and defensive considerations

Potentially observable activity includes no telemetry by itself; referenced procedures may generate any associated technique telemetry. Exact logs vary by Windows, AD, Entra, and tool configuration. Correlate collection windows, source accounts, host names, target objects, and timestamps with SIEM, directory, CA, authentication, endpoint, and network telemetry. Excessive collection or listener activity can itself create availability or detection noise.

## Limitations

Limitations include community or report content can be outdated or environment-specific. The tool does not prove impact by itself, cannot replace effective-ACL or trust-boundary review, and may have false positives or false negatives. Validate findings against current vendor behavior and current project documentation.

## References

- [Project repository: PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [MITRE ATT&CK](https://attack.mitre.org/)
- [Microsoft Learn: Windows Server security and identity documentation](https://learn.microsoft.com/windows-server/identity/)
