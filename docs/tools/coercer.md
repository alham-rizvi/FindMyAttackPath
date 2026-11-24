---
id: coercer
type: tool
label: "Coercer"
repo: "p0dalirius/Coercer"
category: "Coercion"
---

## Overview

Coercer is a suite of Windows RPC authentication-coercion probes.

## High-level capabilities

Contains modules that test whether supported RPC service interfaces can make a target initiate outbound authentication toward a controlled destination.

## Safe authorized assessment and defensive use

Use only in an approved lab or scoped assessment to validate relay boundaries; prefer passive review unless coercion is explicitly authorized.

## Prerequisites and operating boundaries

Explicit host/network scope, reachable RPC interfaces, controlled callback/listener, and monitoring or rollback arrangements.

## Observable behavior and defensive considerations

RPC service calls, outbound SMB/HTTP/Kerberos authentication, DC/endpoint events, and callback-listener records.

## Limitations

A callback proves network reachability only. It does not prove relay success, credential replay, or privilege and may affect availability.

## References

- [Project repository: Coercer](https://github.com/p0dalirius/Coercer)
- [Microsoft Open Specifications](https://learn.microsoft.com/openspecs/windows_protocols/)
