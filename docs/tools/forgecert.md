---
id: forgecert
type: tool
label: "ForgeCert"
repo: "GhostPack/ForgeCert"
category: "ADCS"
---

## Overview

ForgeCert is a C# proof-of-concept for constructing CA-signed certificate material.

## High-level capabilities

Demonstrates certificate subject/issuer construction and the use of CA signing material in certificate-persistence scenarios.

## Authorized red-team assessment and defensive use

Use only in an isolated lab or explicitly authorized CA-compromise simulation. Production trust boundaries must remain untouched.

## Prerequisites and operating boundaries

Lab CA or approved signing material, test identity, and no connection to production certificate trust.

## Observable behavior and defensive considerations

CA signing/issuance, certificate authentication, KDC/DC events, unusual subject/issuer or SAN values, and audit logs.

## Limitations

Impact depends on possession of the CA key and certificate mapping/trust behavior. Certificates may be rejected or revoked.

## References

- [Project repository: ForgeCert](https://github.com/GhostPack/ForgeCert)
- [Microsoft Learn: Active Directory Certificate Services](https://learn.microsoft.com/windows-server/identity/ad-cs/)
