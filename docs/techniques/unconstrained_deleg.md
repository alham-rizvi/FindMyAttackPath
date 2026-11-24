---
id: unconstrained_deleg
type: technique
label: "Unconstrained delegation abuse"
phase: "privesc"
tools: ["petitpotam", "krbrelayx", "rubeus"]
cve: null
detect: "Rubeus-style TGT caching; correlated 4624/4768 events."
mitre: "T1558"
tag: null
---
Coerce a privileged account to authenticate to a server trusted for unconstrained delegation, then lift its cached TGT.

## Prerequisite
A host configured for unconstrained delegation, plus a coercion primitive.
