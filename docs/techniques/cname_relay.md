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

A CNAME changes a DNS name to an alias. In an authentication or AD CS relay hypothesis, alias resolution may interact with Kerberos SPNs, HTTP names and certificate identity validation.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized assessment and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

DNS zone/CNAME and A/AAAA records, resolved host, SPN, HTTP enrollment or service endpoint, TLS certificate, IIS/NTLM/EPA and channel-binding state, and the CA/template trust relationship are the relevant objects.

## Prerequisite chain

A test needs an authorized DNS position, name resolution visible to the intended client, a reachable target, and a protocol where the alias affects identity. DNS write/read alone does not establish relay or issuance.


## Impact limits and failure cases

SPN matching, TLS name validation, HTTPS/EPA, NTLM/Kerberos policy, secure dynamic updates, zone scope, endpoint protections and CA policy can block the chain. Client and server behavior varies by OS and patch level.

## Detection and validation

Correlate DNS zone changes and answers with SPN registration, HTTP/IIS enrollment, KDC/NTLM authentication, CA 4886/4887 issuance and certificate use. CNAME existence alone is not anomalous or proof of abuse.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Restrict DNS write rights and protect dynamic update, manage aliases/SPNs deliberately, require TLS endpoint identity and protected HTTP authentication, and remove unnecessary enrollment surfaces. Recover by restoring DNS/SPN state, reviewing certificate issuance and preserving authentication logs.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [Microsoft: DNS overview](https://learn.microsoft.com/windows-server/networking/dns/dns-overview)
- [Microsoft: Secure DNS dynamic update](https://learn.microsoft.com/windows-server/networking/dns/deploying-secure-dynamic-update)
- [MITRE ATT&CK: T1649](https://attack.mitre.org/techniques/T1649/)
