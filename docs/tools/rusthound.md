---
id: rusthound
type: tool
label: "RustHound-CE"
repo: "OPENCYBER-FR/RustHound-CE"
category: "Graph"
---

## Overview

RustHound-CE is a Rust BloodHound Community Edition collector.

## High-level capabilities

Queries AD and emits graph-compatible collection data without the .NET runtime dependency of SharpHound.

## Authorized red-team assessment and defensive use

Use for authorized graph collection where its platform support and BloodHound CE schema compatibility are suitable.

## Prerequisites and operating boundaries

Domain credentials or supported authentication context, network access, supported Rust binary/runtime, and secure output storage.

## Observable behavior and defensive considerations

LDAP/RPC/SMB/DC authentication and search traffic, process/file activity, and graph ingestion logs.

## Limitations

Feature and schema parity may differ from other collectors. Permissions and network filters can omit relationships.

## References

- [Project repository: RustHound-CE](https://github.com/g0h4n/RustHound-CE)
- [BloodHound documentation](https://bloodhound.specterops.io/)
