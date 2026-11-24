---
id: kerbrute
type: tool
label: "kerbrute"
repo: "ropnop/kerbrute"
category: "Initial Access"
---

## Overview

kerbrute is a Go utility for Kerberos pre-authentication assessment.

## High-level capabilities

Username enumeration and bounded password-candidate validation through Kerberos pre-authentication.

## Safe authorized assessment and defensive use

Use for authorized lockout and account-exposure validation with a documented account/candidate limit.

## Prerequisites and operating boundaries

Domain/KDC reachability, explicit scope, bounded accounts/candidates, and a lockout-threshold plan.

## Observable behavior and defensive considerations

KDC/AS requests and failures, DC security events, account lockouts, source-address and SIEM alerts.

## Limitations

Pre-auth visibility and lockout behavior vary. Negative results do not prove absence of weak or reused passwords.

## References

- [Project repository: kerbrute](https://github.com/ropnop/kerbrute)
- [Microsoft Learn: Kerberos authentication](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
