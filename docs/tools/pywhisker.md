---
id: pywhisker
type: tool
label: "pywhisker"
repo: "ShutdownRepo/pywhisker"
category: "Privilege Escalation"
---

## Overview

pywhisker is a Python implementation for assessing AD Key Credential Link state.

## High-level capabilities

Reads or manages public-key credential metadata on test user/computer objects and checks whether the relevant LDAP write is permitted.

## Authorized red-team assessment and defensive use

Use only in a lab or approved incident exercise to validate object-write controls and Key Credential Link cleanup.

## Prerequisites and operating boundaries

Rights to a test object, LDAPS or compatible LDAP access, and rollback/cleanup procedures.

## Observable behavior and defensive considerations

LDAP writes to Key Credential Link attributes, DC audit/replication, certificate or Kerberos authentication, and endpoint logs.

## Limitations

Support depends on AD and account state. Stored key metadata does not prove authentication or persistence.

## References

- [Project repository: pywhisker](https://github.com/ShutdownRepo/pywhisker)
