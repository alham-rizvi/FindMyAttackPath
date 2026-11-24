---
id: adcs_esc17
type: technique
label: "AD CS ESC17 (Server Auth + enrollee-supplied SAN)"
phase: "privesc"
tools: ["certipy"]
cve: null
detect: "Certificate issuance (4886/4887) for a Server Authentication template where the requester supplied the SAN, especially for internal infrastructure hostnames (e.g. WSUS)."
mitre: "T1649"
tag: "new"
---


# AD CS ESC17 (Server Auth + enrollee-supplied SAN)

### Status
Emerging/placeholder entry (added in the open PR). Track SpecterOps/Certipy research. When confirmed, fill the six-part body and update `adcs_esc_matrix.md`. Do **not** fabricate exploitation steps.

---
