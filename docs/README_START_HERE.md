# Active Directory Assessment Study Guide

This guide is a safe learning path for authorized Active Directory (AD) red-team assessment and job preparation. It emphasizes assessment planning, interpreting evidence, defensive context, and remediation. Use a dedicated lab or an explicitly authorized environment; follow the rules of engagement and do not test systems or identities outside the approved scope. The linked documents are existing pages in this documentation set.

## A practical learning sequence

### 1. Learn the environment and assessment lifecycle
Start with [reconnaissance concepts](phases/recon.md), [initial access and assessment context](phases/initial.md), and [credential exposure concepts](phases/cred.md). Read [LDAP enumeration concepts](techniques/ldap_enum.md) to understand the kinds of directory relationships an assessor may need to review. The goal is to understand what data means and how to document coverage—not to maximize collection or probe unapproved systems.

### 2. Read relationship graphs as hypotheses
Study the [BloodHound overview](tools/bloodhound.md) and [BloodHound collection concepts](techniques/bloodhound_collect.md). Practice interpreting a graph in a lab dataset, distinguishing a potential path from demonstrated access, and identifying the minimum remediation that breaks risky relationships. Review the [GoodHound overview](tools/goodhound.md) for prioritization context.

### 3. Understand identity and Kerberos risks
Review [Kerberoasting exposure and defenses](techniques/kerberoast.md), [AS-REP configuration risks](techniques/asreproast.md), [Kerberos ticket concepts](tools/rubeus.md), and [Impacket protocol capabilities](tools/impacket.md). Focus on why service-account hygiene, pre-authentication settings, ticket protection, encryption policy, and monitoring matter. Keep any validation inside a lab or a specifically approved plan.

### 4. Study permissions, delegation, and privilege boundaries
Read [ACL and permission abuse concepts](techniques/acl_abuse.md), [constrained delegation](techniques/constrained_deleg.md), [resource-based constrained delegation](techniques/rbcd.md), and [unconstrained delegation risks](techniques/unconstrained_deleg.md). Connect each relationship to its defensive owner, business purpose, and least-privilege remediation. Then review [BloodHound](tools/bloodhound.md) again and see how graph evidence can support—but not replace—configuration review.

### 5. Understand credential and remote-access safeguards
Use [password-spray risk and safeguards](techniques/pwspray.md), [pass-the-hash concepts](techniques/pth.md), [pass-the-ticket concepts](techniques/ptt.md), and [SAM/LSA secret protection](techniques/sam_lsa.md) as conceptual reading. Review [NetExec](tools/netexec.md) for the difference between low-impact inventory and higher-risk authentication, data-access, or state-changing modules. For job preparation, be ready to explain controls, likely telemetry, evidence handling, and safer validation alternatives rather than demonstrating credential use.

### 6. Treat domain-controller vulnerabilities as critical incidents
Read the [Zerologon advisory and remediation guide](cves/cve-2020-1472.md) as a model for vulnerability triage: confirm applicability from supported product/update records, verify enforcement safely, review logs, and use the incident-response process if compromise is suspected. The guide intentionally treats Zerologon conceptually and provides no exploit steps. For privileged replication risk, see [DCSync concepts and defenses](techniques/dcsync.md).

### 7. Close with reporting, remediation, and validation
Consult [privilege-escalation assessment concepts](phases/privesc.md), [lateral-movement risk](phases/lateral.md), and [persistence risk](phases/persist.md) as defensive lifecycle context. A professional assessment report should state scope, methods at a high level, evidence and confidence, business impact, detection opportunities, prioritized remediation, and a safe retest plan. Do not include secrets, reusable credentials, or unnecessary personal data in evidence.

## How to use tool pages responsibly
Tool documentation explains capabilities and assessment boundaries, not permission to use them. Confirm the exact scope and approval for collection, authentication testing, ticket operations, remote actions, and access to sensitive data. Prefer read-only and minimum-scope checks. Coordinate with system owners and monitoring teams, protect output, document timestamps and versions, and stop when results indicate unintended impact or out-of-scope access.

## Quick reference

| Topic | Start here |
|---|---|
| Identity relationship graph | [BloodHound](tools/bloodhound.md), [collection concepts](techniques/bloodhound_collect.md) |
| Protocol testing and diagnostics | [Impacket](tools/impacket.md) |
| Authentication and module risk | [NetExec](tools/netexec.md), [password-spray safeguards](techniques/pwspray.md) |
| Kerberos assessment concepts | [Rubeus](tools/rubeus.md), [Kerberoasting](techniques/kerberoast.md), [ticket handling](techniques/ptt.md) |
| Delegation and permissions | [ACLs](techniques/acl_abuse.md), [constrained delegation](techniques/constrained_deleg.md), [RBCD](techniques/rbcd.md) |
| Domain-controller vulnerability response | [CVE-2020-1472 / Zerologon](cves/cve-2020-1472.md) |

All links above are relative to this documentation set. No command-line examples, passwords, hashes, target-enumeration instructions, exploit steps, credential-dump procedures, persistence instructions, or real-target procedures are included in this guide.
