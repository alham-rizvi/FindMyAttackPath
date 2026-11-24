---
id: mimikatz
type: tool
label: "mimikatz"
repo: "gentilkiwi/mimikatz"
category: "Credential Access"
---

## Overview

mimikatz is a Windows security research tool for credentials, tickets, certificates, and identity-state behavior.

## High-level capabilities

Inspects or dumps credential/ticket material, exercises LSASS and token concepts, and includes DCSync, ticket, certificate, and persistence research features.

## Safe authorized assessment and defensive use

Use only for authorized incident response, credential-risk labs, or tightly scoped validation with synthetic or owned data.

## Prerequisites and operating boundaries

A controlled Windows host and separately approved privilege or data access. Credential Guard, LSASS protection, patching, and EDR may block features.

## Observable behavior and defensive considerations

LSASS process access, handle/injection activity, DCSync replication, ticket-cache changes, RPC/DC/KDC authentication, and EDR alerts.

## Limitations

Highly sensitive and potentially disruptive. OS and endpoint protections vary; extracted secrets require incident handling and strict disposal.

## References

- [Project repository: mimikatz](https://github.com/gentilkiwi/mimikatz)
- [Microsoft Learn: Credential Guard](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/credential-guard)
