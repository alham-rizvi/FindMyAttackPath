---
id: petitpotam
type: tool
label: "PetitPotam"
repo: "topotam/PetitPotam"
category: "Coercion"
---

## Overview

PetitPotam is a proof-of-concept for authentication coercion through the MS-EFSR interface.

## High-level capabilities

Tests whether a Windows host can be induced to initiate outbound authentication via the Encrypting File System Remote protocol.

## Safe authorized assessment and defensive use

Use only in a controlled lab or explicitly authorized relay/coercion assessment.

## Prerequisites and operating boundaries

Target approval, reachable EFS RPC, controlled callback/relay, and monitoring.

## Observable behavior and defensive considerations

MS-EFSR RPC, outbound SMB/HTTP/Kerberos authentication, DC security events, endpoint EDR, and listener traffic.

## Limitations

Patch level and RPC exposure vary. A callback does not prove relay success, credential reuse, or privilege.

## References

- [Project repository: PetitPotam](https://github.com/topotam/PetitPotam)
- [Microsoft Open Specifications](https://learn.microsoft.com/openspecs/windows_protocols/)
