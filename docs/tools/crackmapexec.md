---
id: crackmapexec
type: tool
label: "CrackMapExec"
repo: "byt3bl33d3r/CrackMapExec"
category: "Lateral Movement"
---

## Overview

CrackMapExec is the archived predecessor of the NetExec network assessment suite.

## High-level capabilities

Historically combined SMB, LDAP, MSSQL, WinRM, authentication, enumeration, and module reporting.

## Safe authorized assessment and defensive use

Use only for historical findings or legacy comparisons. Prefer maintained NetExec or a purpose-built tool in current assessments.

## Prerequisites and operating boundaries

Archived code, test credentials and hosts, and clear authorization for every module.

## Observable behavior and defensive considerations

Protocol authentication, remote service/process activity, LDAP searches, file access, and endpoint EDR, subject to the old module.

## Limitations

Unmaintained, with stale dependencies and protocol assumptions. It may not reflect modern signing, channel binding, or endpoint controls.

## References

- [Project repository: CrackMapExec](https://github.com/byt3bl33d3r/CrackMapExec)
- [NetExec project](https://github.com/Pennyw0rth/NetExec)
