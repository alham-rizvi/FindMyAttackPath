---
id: dploot
type: tool
label: "dploot"
repo: "zblurx/dploot"
category: "Credential Access"
---

## Overview

dploot is a Python toolkit for remote DPAPI secret extraction and decryption workflows.

## High-level capabilities

Targets supported DPAPI secrets and credentials, using available account or domain key material over remote Windows protocols.

## Authorized red-team assessment and defensive use

Use for authorized incident response or lab validation of DPAPI exposure and credential cleanup.

## Prerequisites and operating boundaries

Scoped credentials, remote connectivity, required key context, and approved secret-handling procedures.

## Observable behavior and defensive considerations

Remote SMB/RPC/WinRM authentication, file/registry access, DPAPI operations, process execution, and EDR.

## Limitations

Success varies by OS, account state, privilege, and key availability. It does not prove every protected secret is recoverable.

## References

- [Project repository: dploot](https://github.com/zblurx/dploot)
- [Microsoft Learn: DPAPI](https://learn.microsoft.com/windows/win32/seccng/cng-dpapi)
