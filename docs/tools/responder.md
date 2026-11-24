---
id: responder
type: tool
label: "Responder"
repo: "lgandx/Responder"
category: "Initial Access"
---

## Overview

Responder is a network responder for legacy name-resolution and authentication-flow research.

## High-level capabilities

Answers LLMNR, NBT-NS, mDNS, and similar requests and can host protocol endpoints for controlled authentication tests.

## Safe authorized assessment and defensive use

Use to test legacy-resolution controls in an approved segment. Capture or relay activity requires explicit authorization and strict secret handling.

## Prerequisites and operating boundaries

Written network scope, controlled segment, approved listeners, and evidence/credential handling procedures.

## Observable behavior and defensive considerations

Name-resolution traffic, listener processes, DNS/network sensors, SMB/HTTP authentication, EDR, and SIEM alerts.

## Limitations

It is noisy and can affect shared hosts. Captured data may be unusable or sensitive, and modern settings reduce exposure.

## References

- [Project repository: Responder](https://github.com/lgandx/Responder)
- [Microsoft Learn: DNS and name resolution](https://learn.microsoft.com/windows-server/networking/dns/dns-overview)
