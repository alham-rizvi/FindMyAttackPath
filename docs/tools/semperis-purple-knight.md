---
id: semperis-purple-knight
type: tool
label: "PurpleKnight"
repo: "SemperisResearch/PurpleKnight"
category: "Reference"
---

## Overview

Purple Knight is Semperis’s free AD and Entra security-assessment product.

## High-level capabilities

Runs indicators across AD, Entra, AD CS, DNS, privileged groups, backup, and configuration areas and generates risk reports.

## Authorized red-team assessment and defensive use

Use for periodic governance and configuration review with approved directory/tenant credentials and secure report handling.

## Prerequisites and operating boundaries

Supported AD/Entra context, appropriate credentials/roles, network/API access, and an authorized reporting destination.

## Observable behavior and defensive considerations

LDAP/Graph/API queries, assessment process activity, DC and Entra audit/sign-in logs, and report access.

## Limitations

Point-in-time product indicators are not proof of exploitability or completeness. Results depend on permissions and release coverage.

## References

- [Project repository: PurpleKnight](https://www.purple-knight.com/)
