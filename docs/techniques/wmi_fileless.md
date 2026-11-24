---
id: wmi_fileless
type: technique
label: "Fileless WMI event-subscription execution"
phase: "lateral"
tools: []
cve: null
detect: "WMI permanent-subscription creation events."
mitre: "T1546.003"
tag: null
---
Execute code through a WMI permanent event subscription, without dropping a payload to disk.

## Prerequisite
WMI write access on the target.

## How it works

WMI permanent event subscriptions associate a system or time event with an action that can run later. Because the subscription is stored in WMI rather than as an ordinary executable file in a startup folder, it may persist across reboots and be less obvious in file-centric reviews. Creating or changing such a subscription requires appropriate permissions and leaves host artifacts.

## Defensive checks

Inventory permanent WMI filters, consumers, and bindings; alert on new or modified subscriptions and unexpected process launches by WMI providers. Remove unauthorized objects only after preserving evidence and confirming they are not used by legitimate management software.

## References

- [MITRE ATT&CK: Windows Management Instrumentation Event Subscription](https://attack.mitre.org/techniques/T1546/003/)
- [Microsoft: WMI architecture](https://learn.microsoft.com/windows/win32/wmisdk/wmi-architecture)
