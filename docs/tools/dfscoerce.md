---
id: dfscoerce
type: tool
label: "DFSCoerce"
repo: "Wh0amI123/DFSCoerce"
category: "Coercion"
---

## Overview

DFSCoerce is a proof-of-concept for authentication coercion through the MS-DFSNM DFS namespace interface.

## High-level capabilities

Invokes the DFS namespace RPC pattern to test whether a host initiates outbound authentication.

## Safe authorized assessment and defensive use

Use only in an isolated lab or explicitly authorized relay assessment with a controlled callback.

## Prerequisites and operating boundaries

Target authorization, reachable DFSN RPC, a callback/listener, and rollback monitoring.

## Observable behavior and defensive considerations

DFS namespace RPC traffic, outbound SMB or authentication, DC/endpoint events, and callback listener telemetry.

## Limitations

Interface exposure and behavior vary by patch level and service state. A callback does not establish relay or elevated access.

## References

- [Project repository: DFSCoerce](https://github.com/Wh04m1001/DFSCoerce)
- [Microsoft Open Specifications](https://learn.microsoft.com/openspecs/windows_protocols/)
