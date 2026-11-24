---
id: evilwinrm
type: tool
label: "evil-winrm"
repo: "Hackplayers/evil-winrm"
category: "Lateral Movement"
---

## Overview

evil-winrm is a Ruby client for interactive Windows Remote Management and PowerShell Remoting.

## High-level capabilities

Provides PSRP/WinRM shell sessions and support for commonly used WinRM authentication formats.

## Authorized red-team assessment and defensive use

Use for authorized remote administration, incident response, or lab practice inside a managed WinRM boundary.

## Prerequisites and operating boundaries

WinRM enabled, network access, a valid authorized identity or certificate, and policy permitting the intended session.

## Observable behavior and defensive considerations

WinRM/WSMan authentication, process and PowerShell script-block logs, JEA transcripts, network events, and EDR.

## Limitations

A shell session does not imply privileged access. JEA and constrained language may limit operations; certificate and authentication modes vary.

## References

- [Project repository: evil-winrm](https://github.com/Hackplayers/evil-winrm)
- [Microsoft Learn: Windows Remote Management](https://learn.microsoft.com/windows/win32/winrm/portal)
