---
id: netexec
type: tool
label: "NetExec"
repo: "Pennyw0rth/NetExec"
category: "Lateral Movement"
---

## Overview

NetExec is a maintained Python framework for Windows network assessment and protocol modules.

## High-level capabilities

SMB, LDAP, MSSQL, WinRM, and other protocol enumeration, authentication checks, approved module execution, and reporting.

## Authorized red-team assessment and defensive use

Use for authorized inventory and exposure validation. Modules that execute or modify state require separate scope.

## Prerequisites and operating boundaries

Approved hosts and credentials, network reachability, compatible protocols, and module-specific authorization.

## Observable behavior and defensive considerations

Protocol authentication, LDAP/RPC/SMB/SQL/WinRM traffic, remote service/process activity, file access, and EDR.

## Limitations

Module support varies by release and target hardening. Authentication success does not establish privileged execution.

## References

- [Project repository: NetExec](https://github.com/Pennyw0rth/NetExec)
