---
id: shadowcoerce
type: tool
label: "ShadowCoerce"
repo: "ShutdownRepo/ShadowCoerce"
category: "Coercion"
---

## Overview

ShadowCoerce is a proof-of-concept for authentication coercion through MS-FSRVP.

## High-level capabilities

Tests whether the File Server Remote VSS Agent Service can induce a target to initiate outbound authentication.

## Authorized red-team assessment and defensive use

Use only in an isolated, written relay/coercion assessment with controlled callbacks.

## Prerequisites and operating boundaries

Explicit target scope, reachable FSRVP RPC, callback/listener, and patch/network monitoring.

## Observable behavior and defensive considerations

FSRVP RPC calls, outbound authentication, DC/endpoint events, SMB/HTTP traffic, EDR, and listener records.

## Limitations

Patch level and service exposure vary. A callback does not prove relay, credential reuse, or elevated access.

## References

- [Project repository: ShadowCoerce](https://github.com/ShutdownRepo/ShadowCoerce)
- [Microsoft Open Specifications](https://learn.microsoft.com/openspecs/windows_protocols/)
