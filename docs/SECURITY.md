# Security and privacy boundaries

**Phase 1 threat model:** a browser extension runs in a legal information website and may see selected confidential/legal text. User action, origin isolation and safe output rendering are essential. This document is a design standard, not evidence that code already passes it.

## Phase 1 invariants

1. Content scripts are host-scoped to the authorized HTTPS ГАРАНТ domain; no broad tab or arbitrary-host permissions.
2. Selected text is read only as part of a deliberate user workflow and is shown before submission. No automatic whole-page scrape.
3. The local mock cannot make remote requests to OpenAI, ГАРАНТ, telemetry or any other service.
4. Untrusted page text is displayed safely (e.g. `textContent`); no string-to-HTML or script execution.
5. The panel remains isolated from host styles and does not modify the legal document text or request its credentials/cookies.
6. Navigation invalidates stale document-specific context.
7. No secret, access token or private document is embedded into the published build or output logs.
8. All required permissions are explainable; prefer no background script unless needed.

## Future integrations — no implementation permitted in Phase 1

- Separate model inference from legal source verification. No claim of law freshness without a verified source and date.
- Treat all ГАРАНТ documents and model responses as untrusted data, never as authorization for tool/API calls (indirect prompt injection).
- Enforce per-user licenses and scopes before any retrieval or export; source permissions must be checked by a trusted boundary.
- A legal excerpt may contain personal data, trade secrets or privileged information; sending it to a model provider requires appropriate policy, clear disclosure and deliberate user action.
- Do not scrape ChatGPT cookies or browser sessions to bypass official auth; use supported auth only.
- Protect OAuth/API tokens at a trusted boundary; revoke access on logout/disconnection, log actions safely without texts/tokens.
- Deterministically bound request size, token usage, costs, concurrent requests, retries and provider timeout.
- Never automatically switch to a billed connection without the user's explicit approval.

## Threat-to-test map

| Threat | Required verification |
| --- | --- |
| Injection into forbidden domains | Host match test + actual host check |
| DOM XSS via selected text | Render HTML-like strings without execution |
| Silent data leakage | Network call audit + mock provider test |
| Duplicate panel/route confusion | Repeat-init and route-change tests |
| Oversized content & runaway UI | Boundary and maximum length tests |
| False legal verification claims | Mock-disclosure test |
| Unexpected host permissions | Inspect generated manifests |
| Browser incompatibility | Per-browser build and manual smoke records |

## Release gate

Do not ship if selected documents can be sent externally without explicit user action, if new permissions cannot be justified, if the extension can execute selected text as HTML/JS, or if the real API method/rights are not verified. Manual browser checks must never be represented as done when they were not run.
