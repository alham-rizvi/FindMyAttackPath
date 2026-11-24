---
id: impacket
type: tool
label: "impacket"
repo: "fortra/impacket"
category: "Credential Access"
---
## Overview
Impacket is a Python library and tool collection implementing Windows network protocols. It includes protocol clients and utilities for SMB, RPC/MSRPC, LDAP, Kerberos, NTLM, MSSQL, WMI, and related technologies. Its flexibility makes it useful for interoperability research and authorized assessment, but some capabilities can access sensitive credentials or change remote systems.

## High-level capabilities
The project supports protocol diagnostics, directory and service interaction, authentication testing, and incident-response or lab workflows. Familiarity with protocol behavior can help an assessor explain why a control matters and help defenders investigate abnormal authentication or remote-management activity.

Several well-known utilities have dual-use capabilities involving service-account ticket requests, directory replication privileges, remote execution, ticket handling, delegation, account creation, or relay behavior. Those capabilities can expose credentials or secrets, alter configuration, or cross system boundaries. This document describes the categories at a high level and intentionally omits command lines and execution recipes.

## Authorized assessment and defensive use
Before using any component, confirm written authorization, the permitted identities and hosts, allowed protocols, data-handling rules, operating windows, and stop conditions. Use a purpose-built lab or approved test environment when validating protocol behavior. Choose read-only diagnostics where possible, and obtain separate approval for any action that authenticates as another identity, requests sensitive material, modifies directory state, or executes code remotely.

Treat authentication material, ticket data, directory exports, and diagnostic output as sensitive. Do not place secrets in shell history, scripts, logs, issue trackers, or unprotected evidence bundles. Keep a record of the tool version, approved purpose, operator identity, time window, and resulting evidence without retaining unnecessary sensitive content.

## Detection and remediation context
Defenders can investigate unusual authentication patterns, unexpected directory replication requests, abnormal service-ticket activity, remote service creation, remote-management use, account creation, delegation changes, and relay-like protocol flows. Correlate identity, endpoint, domain-controller, and network telemetry with approved change windows; no single event is conclusive in every environment.

Mitigations depend on the finding and may include enforcing least privilege for replication and remote administration, reducing unnecessary service-account privileges, hardening authentication and signing requirements, restricting legacy protocols, auditing delegation and account-creation controls, and reviewing endpoint and domain-controller telemetry. Validate proposed changes with system owners to avoid disrupting legitimate dependencies.

## Prerequisites and operating boundaries
Use a maintained, trusted release in a controlled Python environment with approved identities and hosts, required network reachability, and protocol-specific signing and firewall policy understood. This page is not an operational runbook and intentionally contains no runnable commands, credential material, or procedures for extracting secrets, moving laterally, or establishing access.

## Related documentation
- [Kerberos service-account exposure concepts](../techniques/kerberoast.md)
- [Directory replication privilege risk](../techniques/dcsync.md)
- [Remote authentication concepts](../techniques/pth.md)
- [NTLM relay risk](../techniques/ntlm_reflection.md)
- [Directory enumeration concepts](../techniques/ldap_enum.md)
