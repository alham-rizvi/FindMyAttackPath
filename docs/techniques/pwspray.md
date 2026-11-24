---
id: pwspray
type: technique
label: "Password spraying"
phase: "initial"
tools: ["kerbrute", "netexec"]
cve: null
detect: "4625 bursts across many accounts from one source."
mitre: "T1110.003"
tag: null
---
Try one or two common passwords across many accounts to stay under lockout thresholds.

## Prerequisite
A valid username list.
