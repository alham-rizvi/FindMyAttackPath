---
id: kerberoast
type: technique
label: "Kerberoasting"
phase: "initial"
tools: ["rubeus", "impacket", "hashcat"]
cve: null
detect: "4769 requesting RC4 (etype 0x17) for an unusual SPN."
mitre: "T1558.003"
tag: null
---

# Kerberoasting

Kerberoasting is the acquisition of Kerberos Ticket Granting Service (TGS) tickets for SPN-bearing service identities so that authorized credential-strength review can assess whether the account secret is recoverable offline. A ticket or SPN alone is not account compromise.

> **Authorized assessment only:** This guide is for controlled labs and explicitly authorized assessments. It contains no commands, password-guessing parameters, exploit procedure or real-target instructions.

## Protocol and objects

Kerberos authenticates a requester, issues a TGT, and accepts a TGS request for a service principal name (SPN). The returned service ticket is protected under key material associated with the target account or computer identity.

| Object or protocol item | Normal purpose | Assessment point |
| --- | --- | --- |
| Domain requester and TGT | Establishes authenticated domain identity | A valid authorized identity and KDC reachability are required |
| ServicePrincipalName | Associates a service instance with a user/computer object | Confirm the SPN, account type and host/service actually represented |
| TGS-REQ / TGS-REP | Requests and returns a service ticket | Ticket acquisition is protocol behavior; it does not prove the account password is weak |
| Ticket encryption type | Selects RC4, AES or another supported key type for the ticket | AES/RC4 policy varies by account and domain; encryption type alone is not credential recovery |
| Manual service account | User account used by SQL, IIS, backup or application services | Password strength, reuse, AD groups and local/application privilege determine impact |
| Computer account or gMSA | Machine or managed service identity with an SPN | gMSAs use automatically managed keys and tightly controlled retrieval; do not compare them directly to manual user passwords |
| Target service authorization | Decides whether a ticket grants access to an application/function | A ticket for an SPN is bounded to that service identity and target; it is not domain-wide authority |

## Conceptual input and result

The conceptual input is an authenticated domain principal, a registered SPN and access to the KDC. The conceptual result is a TGS ticket whose cryptographic material reflects the target account’s long-term key. The resulting ticket should not be described as a plaintext password or an automatically reusable account secret.

For a manual service account, impact may include the account’s application ACL, local groups or AD memberships. A privileged or reused account is more consequential. For a computer account or gMSA, account scope is generally narrower and managed credential rotation/retrieval changes the result. A low-privilege application account may yield no meaningful administrative impact.

## Prerequisite chain

1. The requester needs valid domain authentication and network/KDC reachability.
2. The target object must carry an SPN and be resolvable as a service identity.
3. The KDC must issue a usable TGS ticket for the target encryption/context policy.
4. Authorized offline review must establish credential strength and reuse.
5. Account/service scope must establish real authorization; ticket collection alone is not compromise.

An account lockout policy does not apply to already issued ticket material in the same way as an interactive login. Nevertheless, this does not imply that every ticket is recoverable or that a recovered secret is privileged.

## Failure cases and impact limits

- An SPN can exist on a strong-random-password account, gMSA or unrelated/obsolete service identity.
- AES-only policy and current gMSA management reduce or remove common manual-password risk.
- RC4 policy can increase observability or affect ticket material, but RC4/SUPPORTED_ENCRYPTION_TYPES does not prove a recoverable password.
- KDC reachability, domain policy, account state and target service authorization vary by build and configuration.
- A recovered secret may not be reusable outside the account/service scope or after a password/credential rotation.
- A TGS ticket grants service-specific context; it does not grant unrelated hosts or every privilege held by an account.

## Detection and validation

Event 4769 shows TGS issuance, encryption type, account/service name and source when auditing is configured. Correlate it with the KDC source, requester, target SPN, 5136/4738/4742-class account or SPN changes, and 4624/4769 service authentication. Directory object history can distinguish a real SPN-bearing service account from an obsolete registration.

Baseline known service-management systems before classifying unusual 4769 volume. Confirm RC4/AES policy and account type, and determine whether the account is manually managed, privileged or reused. A successful authorized credential assessment should be reported with service/account scope and rotation actions—not a guessed password or replay detail.

## Mitigation and recovery

Prefer gMSAs or strong, random, unique service passwords. Remove obsolete SPNs, restrict service-account membership and access, and disable RC4 only after compatibility testing. Use a dedicated service identity rather than a user account for infrastructure services where supported.

If weak credential exposure is confirmed, preserve KDC and service evidence, rotate the service secret through its supported application/host procedure, update dependent services and remove obsolete SPNs. Review account reuse and service access, and for gMSAs use supported managed-password and host-membership correction rather than manual secrets.

## References

- [Microsoft: Kerberos authentication overview](https://learn.microsoft.com/windows-server/security/kerberos/kerberos-authentication-overview)
- [Microsoft: Service Principal Names](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/component-update/service-principal-names)
- [Microsoft: Group Managed Service Accounts](https://learn.microsoft.com/windows-server/security/group-managed-service-accounts/group-managed-service-accounts-overview)
- [MITRE ATT&CK: T1558.003](https://attack.mitre.org/techniques/T1558/003/)
