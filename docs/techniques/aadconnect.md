---
id: aadconnect
type: technique
label: "Entra Connect credential extraction"
phase: "hybrid"
tools: ["aadinternals"]
cve: null
detect: "Access to the ADSync/Entra Connect database."
mitre: "T1552.001"
tag: null
---
Extract the sync service account's credentials from the Entra/Azure AD Connect server, enabling a pivot into the cloud tenant.

## Prerequisite
Admin access to the Connect server.

## How it works

Microsoft Entra Connect synchronizes selected identities and attributes between on-premises Active Directory and a cloud tenant. Its server and service identity are therefore high-value assets. An attacker with administrative access may attempt to access sync databases, stored credentials, or the sync identity's permissions and then use that authority in the tenant; the actual reach depends on sync mode and configured roles.

## Defensive checks

Treat sync servers as Tier-0 systems, restrict interactive logon and local administration, protect service credentials, and review the sync account's effective cloud and directory roles. Monitor access to synchronization databases and unusual sync-service or tenant activity. If exposure is suspected, contain both on-premises and cloud identities and follow Microsoft's rotation guidance.

## References

- [Microsoft: What is Microsoft Entra Connect?](https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-azure-ad-connect)
- [Microsoft: Secure Microsoft Entra Connect](https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-install-prerequisites#security)
- [MITRE ATT&CK: Credentials from Password Stores](https://attack.mitre.org/techniques/T1555/)
