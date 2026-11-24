---
id: adsearch
type: tool
label: "ADSearch"
repo: "AlmondOffSec/ADSearch"
category: "Recon"
---

## Overview

ADSearch is an LDAP-focused utility for querying Active Directory objects and attributes.

## High-level capabilities

Configurable LDAP searches for users, computers, groups, trusts, privilege groups, and security-relevant directory fields.

## Safe authorized assessment and defensive use

Use repeatable read-only filters for inventory and finding reproduction in an authorized domain.

## Prerequisites and operating boundaries

LDAP or LDAPS, authorized credentials, read rights, and knowledge of the target search base and schema.

## Observable behavior and defensive considerations

LDAP bind/search traffic, DC audit or network logs, and LDAPS-encrypted request metadata.

## Limitations

Successful object hits do not prove privilege or exploitability; filters and scope can miss objects or stale replicas.

## References

