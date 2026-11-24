---
id: donpapi
type: tool
label: "DonPAPI"
repo: "login-securite/DonPAPI"
category: "Credential Access"
---

## Overview

DonPAPI is a remote framework for discovering and recovering supported DPAPI-protected secrets.

## High-level capabilities

Coordinates remote access and decryption of DPAPI material where account, machine, or domain key context is available.

## Authorized red-team assessment and defensive use

Use only for authorized incident response or a tightly controlled credential-exposure assessment.

## Prerequisites and operating boundaries

Valid scoped credentials, remote protocol access, required key context, and strict handling for recovered secrets.

## Observable behavior and defensive considerations

Remote authentication and service access, file/registry reads, DPAPI operations, process execution, and endpoint DLP/EDR.

## Limitations

Remote recovery is context-dependent and may fail without the required account or domain keys. Output is highly sensitive.

## References

- [Project repository: DonPAPI](https://github.com/login-securite/DonPAPI)
- [Microsoft Learn: DPAPI](https://learn.microsoft.com/windows/win32/seccng/cng-dpapi)
