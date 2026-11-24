---
id: hashcat
type: tool
label: "hashcat"
repo: "hashcat/hashcat"
category: "Cracking"
---

## Overview

hashcat is a GPU- and CPU-accelerated offline password and key recovery tool.

## High-level capabilities

Supports many hash formats, rules, masks, combinators, benchmarks, and workload distribution.

## Safe authorized assessment and defensive use

Use only on owned or authorized hashes for password-policy validation or incident recovery.

## Prerequisites and operating boundaries

Suitable hardware, supported format and dependencies, authorized data, and secure handling of candidates and results.

## Observable behavior and defensive considerations

Mostly host-side GPU/CPU, process, and file-access telemetry; target systems generally produce none for offline work.

## Limitations

Success depends on format, work factor, candidate space, and hardware. A no-result test does not prove strong passwords.

## References

- [Project repository: hashcat](https://github.com/hashcat/hashcat)
