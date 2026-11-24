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
Plant a DNS CNAME to redirect ticket requests, relaying the resulting authentication into AD CS web enrollment.

## Prerequisite
DNS write access and a reachable CA with a relayable web-enrollment configuration.

## How it works

This scenario combines control over a DNS alias with Kerberos service-name resolution and an AD CS web-enrollment path that accepts relayed authentication. If name canonicalization and service identity checks do not behave as administrators expect, authentication may be directed to an unintended endpoint and then relayed to a certificate service. The DNS change, authentication protections, CA configuration, and enrollment policy must all be evaluated together.

## Defensive checks

Restrict who can modify DNS records, monitor unexpected alias changes, use secure name-resolution practices, and harden CA web enrollment with HTTPS and Extended Protection. Review certificate requests for unexpected identities and correlate them with DNS and authentication changes. Treat the chain as configuration-specific and validate the claimed behavior against current vendor and researcher advisories.

## References

- [MITRE ATT&CK: Steal or Forge Authentication Certificates](https://attack.mitre.org/techniques/T1649/)
- [SpecterOps: Certified Pre-Owned](https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf)
