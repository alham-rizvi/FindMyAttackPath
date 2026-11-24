---
id: sauroneye
type: tool
label: "SauronEye"
repo: "vivami/SauronEye"
category: "Recon"
---

## Overview

SauronEye is a Windows host/share sensitive-file discovery utility.

## High-level capabilities

Searches configured file systems or shares using filename and content patterns to identify documents that may contain secrets or regulated data.

## Safe authorized assessment and defensive use

Use for authorized data discovery and incident scoping with a bounded share set and controlled results.

## Prerequisites and operating boundaries

Written host/share scope, valid read permissions, and secure handling of matches.

## Observable behavior and defensive considerations

SMB/file-share reads, file enumeration, process activity, EDR, DLP, and storage audit events.

## Limitations

Matches are heuristic, not valid-secret or data-classification proof. Encryption and permissions limit coverage.

## References

- [Project repository: SauronEye](https://github.com/vivami/SauronEye)
- [Microsoft Learn: SMB](https://learn.microsoft.com/windows-server/storage/file-server/troubleshoot/smb-known-issues)
