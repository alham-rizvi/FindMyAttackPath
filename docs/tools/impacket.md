---
id: impacket
type: tool
label: "impacket"
repo: "fortra/impacket"
category: "Credential Access"
---

## Overview

Impacket is a Python library and tool collection implementing Windows network protocols.

## High-level capabilities

Provides SMB, RPC/MSRPC, LDAP, Kerberos, NTLM, MSSQL, WMI, and other Windows protocol clients, servers, and helpers.

## Safe authorized assessment and defensive use

Use for authorized interoperability testing, protocol diagnostics, defensive lab automation, and incident-response support.

## Prerequisites and operating boundaries

Python environment, approved identities and hosts, network reachability, and protocol-specific signing/firewall policy.

## Observable behavior and defensive considerations

Authentication, RPC/SMB/LDAP/MSSQL/Kerberos traffic, remote service/process activity, listeners, and endpoint telemetry vary by helper.

## Limitations

Protocol behavior differs across Windows releases and hardening. Library success does not establish privilege or impact.

## References

- [Project repository: impacket](https://github.com/fortra/impacket)
- [Microsoft Open Specifications](https://learn.microsoft.com/openspecs/windows_protocols/)
