---
id: lsass_dump
type: technique
label: "LSASS memory dumping"
phase: "cred"
tools: ["mimikatz"]
cve: null
detect: "Sysmon EID 10 — process access to lsass.exe."
mitre: "T1003.001"
tag: null
---
Pull plaintext passwords, NTLM hashes and Kerberos keys out of the LSASS process.

## Prerequisite
Local admin or SeDebugPrivilege.

## How it works

The Local Security Authority Subsystem Service (LSASS) manages logon sessions and may hold credential material needed for authentication. If a process with sufficient privileges can read or copy sensitive LSASS memory, it may expose secrets associated with active or cached sessions. The exact material available depends on Windows protections, logon type, and credential configuration.

## Defensive checks

Enable Credential Guard and LSASS protection where supported, minimize local administrator access, and use endpoint protection that blocks suspicious process access to LSASS. Correlate process-access telemetry, dump-file creation, and unusual privilege use; investigate the initiating process and user rather than relying on one event ID.

## References

- [MITRE ATT&CK: OS Credential Dumping: LSASS Memory](https://attack.mitre.org/techniques/T1003/001/)
- [Microsoft: Credential Guard overview](https://learn.microsoft.com/windows/security/identity-protection/credential-guard/)
- [Microsoft: Configure added LSA protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/configuring-additional-lsa-protection)
