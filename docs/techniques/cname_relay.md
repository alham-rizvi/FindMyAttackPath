---
id: cname_relay
type: technique
label: "Kerberos CNAME-abuse relay to ADCS (ESC8)"
phase: "initial"
tools: ["impacket"]
cve: null
detect: "Unexpected DNS CNAME changes; certificate issuance outside normal workflow."
mitre: "T1649"
tag: "new"
---

# Kerberos CNAME-abuse relay to ADCS (ESC8)

> **Authorized assessment only:** This page supports authorized Active Directory assessment, controlled lab study, and job preparation. It intentionally omits runnable exploitation commands, credential extraction procedures, and real-target instructions.

This page describes the security significance of the configuration or relationship named below. For an authorized assessment, establish scope, review effective settings and ownership, and distinguish a potential path from observed impact. Do not make state changes or access sensitive data unless the exact validation is approved and safely controlled.

## Affected object / attribute
**ADIDNS zone / record** (`MicrosoftDNS`), default `Authenticated Users` create rights in some configurations.

## Detection
**5136** on `MicrosoftDNS`; **4662** zone writes; disable insecure dynamic updates.

---

## References

- [Microsoft: DNS overview](https://learn.microsoft.com/windows-server/networking/dns/dns-overview)
- [Microsoft: Secure DNS dynamic update](https://learn.microsoft.com/windows-server/networking/dns/deploying-secure-dynamic-update)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
