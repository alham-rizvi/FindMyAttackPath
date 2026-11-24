# Active Directory Pentesting — Exhaustive Deep-Dive Reference

**Scope.** This document expands every entry in the `docs/` tree into a full operational and defensive deep-dive. Each technique is broken down by **affected AD object / attribute**, **attack flow (Mermaid)**, **step-by-step mechanics**, **exhaustive tooling and commands**, **impact**, and **detection / defensive measures**. Tool pages follow a compact equivalent. The structure mirrors the 138-file tree so each section can be copied directly into the matching `.md` file.

> ⚠️ **Authorisation and safety.** Everything here is for authorised engagements, lab ranges (GOAD, HTB/THM AD tracks), and your own test domain. Zerologon, noPac, PrintNightmare, DCShadow, AdminSDHolder writes, ESC4/ESC7 template/CA changes, and SID History writes are **state-changing** and can break production AD. Always snapshot before, restore after, and document every change.

---
