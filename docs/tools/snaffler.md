---
id: snaffler
type: tool
label: "Snaffler"
repo: "SnaffCon/Snaffler"
category: "Recon"
---

## Overview

Snaffler is a Windows share and sensitive-file discovery tool.

## High-level capabilities

Enumerates approved shares and applies heuristics to filenames and contents for likely credentials, configuration, backups, and sensitive artifacts.

## Authorized red-team assessment and defensive use

Use for authorized data-exposure review and incident scoping with bounded shares and controlled output.

## Prerequisites and operating boundaries

Written share scope, credentials with approved read rights, and secure storage for matches.

## Observable behavior and defensive considerations

SMB/share enumeration and file reads, process activity, EDR, DLP, and storage audit logs.

## Limitations

Heuristics create false positives and miss encrypted or poorly named files. It does not prove secret validity or ownership.

## References

- [Project repository: Snaffler](https://github.com/SnaffCon/Snaffler)
- [Microsoft Learn: SMB](https://learn.microsoft.com/windows-server/storage/file-server/troubleshoot/smb-known-issues)
