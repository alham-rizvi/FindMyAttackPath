---
id: netexec
type: tool
label: "NetExec"
repo: "Pennyw0rth/NetExec"
category: "Lateral Movement"
---
## Overview
NetExec is a maintained Python framework for assessing Windows network services and protocols. It offers modules for SMB, LDAP, MSSQL, WinRM, and other services. Its broad feature set can support authorized inventory and exposure validation, but some modules perform authentication at scale, access sensitive data, execute actions, or change state.

## High-level capabilities
At a conceptual level, NetExec can help teams review protocol availability, validate explicitly approved authentication scenarios, collect selected service or directory information, and run purpose-built assessment modules. The impact and risk vary significantly by protocol and module; a module described as a check may still generate authentication events or interact with remote systems.

## Authorized assessment and defensive use
Define the approved hosts, identity set, protocol scope, attempt limits, maintenance window, data-handling rules, and stop conditions before testing. Do not use broad address ranges or user lists unless they are explicitly authorized and operationally reviewed. Avoid password spraying, hash-based authentication, remote execution, secret collection, and state-changing modules unless a written test plan specifically authorizes the exact action and safeguards.

Prefer narrow, low-impact validation. Coordinate with identity and monitoring teams so expected authentication and network events can be recognized. Stop promptly if lockout thresholds, service degradation, unexpected access, or out-of-scope assets are encountered. Record the tool/module version and the approved test objective; protect any output that contains identity or host information.

## Detection and remediation context
Monitoring teams may review bursts of failed or successful authentication, unusual source-to-host patterns, remote management activity, access to administrative shares, unexpected directory queries, account lockouts, and attempts to access credential stores. Correlate events across domain controllers, endpoints, and network sensors, while accounting for known management systems and assessment windows.

Defensive improvements may include unique and managed administrative credentials, least-privilege group membership, limiting remote administration to approved management paths, reducing legacy protocol exposure, appropriate SMB signing and firewall policy, account lockout and authentication protections tuned to business requirements, and alerting on sensitive access. Remediate the underlying permission or exposure rather than relying only on detection.

## Prerequisites and operating boundaries
Use an approved release in a controlled environment with explicitly approved hosts and identities, network reachability, compatible protocols, and module-specific authorization. This guide is for assessment planning and job preparation; it intentionally includes no runnable commands, target-enumeration instructions, credential material, credential-dumping steps, or real-target procedures.

## Related documentation
- [Password-spray risk and safeguards](../techniques/pwspray.md)
- [Pass-the-hash concepts](../techniques/pth.md)
- [SAM and LSA secret protection](../techniques/sam_lsa.md)
- [LDAP enumeration concepts](../techniques/ldap_enum.md)
- [CrackMapExec background](crackmapexec.md)
