---
id: whisker
type: tool
label: "Whisker"
repo: "eladshamir/Whisker"
category: "Privilege Escalation"
---

## Overview

Whisker is a C# tool for assessing and modifying AD Key Credential Link state.

## High-level capabilities

Creates, lists, or removes public-key credential metadata on test AD objects and checks whether the LDAP write is permitted.

## Authorized red-team assessment and defensive use

Use only in an isolated lab or approved incident exercise to validate write controls and then remove test state.

## Prerequisites and operating boundaries

LDAPS or compatible LDAP access, explicit write rights to test objects, and rollback/cleanup procedures.

## Observable behavior and defensive considerations

LDAP attribute writes, DC audit/replication, Key Credential Link state, certificate or Kerberos authentication, and endpoint logs.

## Limitations

It changes security-sensitive directory state. AD support and account type affect behavior; key metadata does not prove authentication or persistence.

## References

- [Project repository: Whisker](https://github.com/eladshamir/Whisker)
