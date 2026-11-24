---
id: acl_abuse
type: technique
label: "ACL abuse (GenericAll / WriteDACL / ForceChangePassword)"
phase: "privesc"
tools: ["bloodyad", "powerview", "impacket"]
cve: null
detect: "5136 — directory object modified."
mitre: "T1222 / T1098"
tag: null
---
Use an over-permissioned ACE to reset a password, add group membership, or grant further rights.

## Prerequisite
Control over an AD object via a weak ACE.
