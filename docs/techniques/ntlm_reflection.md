---
id: ntlm_reflection
type: technique
label: "NTLM reflection"
phase: "initial"
tools: ["impacket", "petitpotam"]
cve: "cve-2025-33073"
detect: "Loopback-pattern 4624 type 3; anomalous local relay traffic."
mitre: "T1557.001"
tag: "new"
---
NTLM reflection is a relay scenario in which a host's authentication exchange is redirected back to a local service that may accept it under unsafe conditions.

## Prerequisite
The relevant local service and protocol protections are misconfigured or vulnerable.

## How it works

The technique relies on an authentication exchange being accepted by a service that should not trust that reflected identity. Feasibility varies by Windows version, patch level, service, and protocol protections; the presence of NTLM alone does not establish that a host is vulnerable.

## Defensive checks

Apply current security updates, require SMB signing, enable Extended Protection or channel binding for applicable services, and reduce NTLM use. Correlate same-host or loopback authentication patterns with service activity and patch level. Validate exposure using vendor guidance in a controlled environment.

## References

- [MITRE ATT&CK: LLMNR/NBT-NS Poisoning and SMB Relay](https://attack.mitre.org/techniques/T1557/001/)
- [Microsoft Security Response Center](https://msrc.microsoft.com/)
