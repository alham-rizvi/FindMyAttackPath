---
id: nopac
type: technique
label: "noPac (sAMAccountName spoofing)"
phase: "privesc"
tools: ["impacket", "rubeus", "powermad"]
cve: "cve-2021-42287"
detect: "4769 showing sAMAccountName/dNSHostName spoofing."
mitre: "T1558"
tag: "new"
---

# noPac (sAMAccountName spoofing)

noPac is a patch-sensitive class of Kerberos/DC account-name/PAC behavior associated with CVE-2021-42287 and related historical fixes. It must not be inferred from a duplicate name or tool label alone.

> **Authorized assessment only:** This guide describes controlled, explicitly authorized red-team assessment, lab practice, and defensive validation. It contains no target commands, exploit recipes, payloads, guessing parameters or real-target procedure.

## Relevant objects and normal purpose

Computer and user sAMAccountName/dNSHostName, SPNs, PAC fields, DC account mapping, KDC behavior and resource/service SID validation are involved.

## Prerequisite chain

The exact DC/build must be affected, the account naming state must permit the historical mapping behavior, and the resource must accept the resulting identity. Account control or a name collision alone is insufficient.


## Impact limits and failure cases

Patch/build, account naming, SPN/DNS collision, PAC validation and target authorization vary. Current patched DC and consistent names generally remove or block the historical condition.

## Detection and validation

Correlate 4769/PAC anomalies with renamed/computer/DC names, 4742/4738 account/SPN changes and privileged target access. Version-specific 4769 fields are not standalone proof.

Validate an impact hypothesis by correlating the relevant identity, directory, authentication, endpoint, network or cloud telemetry for the exact host, account and time. One event ID or tool label is not proof of success.

## Mitigation and recovery

**Mitigation:** Apply Microsoft updates, avoid naming collisions and unauthorized renames, restrict computer-object creation and monitor PAC/SPN changes.

**Recovery:** Preserve evidence, isolate affected systems and identities, remove unauthorized state through approved procedures, review relevant credentials/sessions and retest in a clean lab.

## References

- [NVD: CVE-2021-42287](https://nvd.nist.gov/vuln/detail/CVE-2021-42287)
- [Microsoft Security Update Guide: CVE-2021-42287](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-42287)
- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Credential protection](https://learn.microsoft.com/windows-server/security/credentials-protection-and-management/credential-protection-and-management)
- [MITRE ATT&CK: T1558](https://attack.mitre.org/techniques/T1558/)
