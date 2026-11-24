---
id: adcollector
type: tool
label: "ADCollector"
repo: "dev-2null/ADCollector"
category: "Recon"
---

## Overview

ADCollector is a Windows-oriented utility that collects Active Directory configuration and highlights selected misconfiguration indicators.

## High-level capabilities

Selected inventory of users, computers, groups, trusts, permissions, policies, sessions, or related AD objects implemented by the release.

## Authorized red-team assessment and defensive use

Use read-oriented collection for an authorized domain baseline, then verify effective ACLs and business context before remediation.

## Prerequisites and operating boundaries

Domain read access, Windows execution support, network reachability to domain services, and a protected report destination.

## Observable behavior and defensive considerations

LDAP/DC authentication and search traffic, any RPC/SMB lookups, executable or script process activity, and report-file access.

## Limitations

Output reflects permissions and implemented checks. It may miss nested ACLs, compensating controls, replication state, or newer schema features.

## References

- [Project repository: ADCollector](https://github.com/dev-2null/ADCollector)
