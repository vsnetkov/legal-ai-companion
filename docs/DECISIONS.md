# Decision record and unresolved assumptions

These are design intentions distilled for the handoff. **They are not evidence that the repository implements them.** An agent must confirm actual repository ADRs and ask the owner before overturning existing accepted decisions.

| ID | Status | Decision | Reason / boundary |
| --- | --- | --- | --- |
| D-001 | Confirmed product intent | ChatGPT/OpenAI, not Codex Runtime, is intended for end-user legal analysis | Codex/OpenCode are development tools only |
| D-002 | Confirmed product intent | Target Chrome, Opera, Firefox and Яндекс Браузер | Single source tree with limited browser-specific adaptations; verification pending |
| D-003 | Current task boundary | Phase 1 is an offline mock-based panel on `internet.garant.ru` | Demonstrate UX without licenses, credentials or unexpected spend |
| D-004 | Proposed architecture | Use WebExtensions Manifest V3 and isolated Shadow DOM | Low surface area, maintainability, site style isolation |
| D-005 | Proposed architecture | Explicitly selected text only; 12k-character limit, preview and submit | Privacy by design, deterministic testability |
| D-006 | Deferred decision | OpenAI API transport and how billing/credentials work | Depends on operational model and security review |
| D-007 | Deferred decision | Sign in with ChatGPT | Requires current OpenAI partner/open-source access, OAuth constraints and per-user authorization |
| D-008 | Deferred decision | ГАРАНТ Connect integration | Requires licensed API/MCP access, legal terms and real source metadata |
| D-009 | Current development guardrail | No commit/push/merge/deploy/destructive actions by agent | Owner must approve each separately |

## Open questions after Phase 1

- Does the installed version of the ГАРАНТ site permit stable extension injection and route detection?
- Is our intended distribution genuinely a local open-source tool or a commercial distributed extension? This matters for Sign in with ChatGPT eligibility.
- Who pays for real model API calls: user with API access, or application operator?
- What ГАРАНТ licensing and data-transfer terms apply to selected text?
- Which browsers/versions were actually tested and which remain targets only?

Do not prematurely convert these unresolved issues into engineering tasks within Phase 1.
