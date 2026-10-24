# Architecture — proposed minimum

**Not yet verified against application source.** The agent must inspect the actual repository before choosing files, packages or abstractions.

## Phase 1 data flow

```text
Browser: https://internet.garant.ru/*
    │ content script (only allowed host)
    ▼
Compact launch control + isolated Shadow DOM panel
    │ explicit user selection + preview + submit
    ▼
Local-only deterministic mock response
    │
    ▼
Text-only rendered message + demo disclosure
```

**No network/data processing service in this phase.** The extension must not read ГАРАНТ cookies, change the legal document or perform automated legal data extraction.

## Minimum module responsibilities

- Content script: inject one control and one panel host; guard duplicates and prohibited hosts.
- UI module: render panel, manage question/preview/display state and keyboard behavior.
- Selection helper: read selected text only on explicit capture, validate UTF-16 length/limit as documented, clear stale document context.
- Demo provider: deterministic in-memory response with disclosure; no `fetch`, sockets, remote scripts or authentication.
- Dedicated CSS: styling encapsulated in Shadow DOM; do not impose global styles.
- Build config: actual Chromium/Firefox outputs with manifest changes kept minimal.
- Tests: pure unit tests for validation and appropriate DOM integration tests.

Do **not** create future integration folders/interfaces until genuinely needed. Avoid adding a background/service worker unless a required behavior justifies it. Use existing repository modules if they already satisfy responsibilities.

## Platform strategy

WebExtensions API and Manifest V3 are the baseline. Chrome uses an extension service worker for a background context; Firefox uses event-page/background scripts for MV3 in current MDN documentation. An extension needing no background work may avoid that difference. If needed, generate compatible browser-specific manifests from shared sources.

A successful Chromium build does not establish compatibility with Opera/Яндекс. Firefox build is distinct from actually loading the add-on in Firefox. Record browser versions used for actual smoke tests.

## SPA/DOM boundaries

- Only attach to authorized host; never inject into arbitrary tabs or cross-origin frames by default.
- Guard multiple initialization, avoid DOM selector dependence on unstable site internals, and detect route/document changes when needed to prevent wrong-document context.
- Browser selection may be lost on focus shift; capture during a deliberate interaction without background harvesting, and prove it works in tested browsers.
- Render text safely as text; never treat page HTML as developer instructions.
- Prefer direct DOM within ShadowRoot; do not copy/cross-domain embed ChatGPT's website, reuse its session cookies, or automate its consumer interface.

## Future interfaces (concept only)

```text
User-approved legal text/context
  -> provider policy (entitlement + consent + limits)
  -> [OpenAI API via trusted credential boundary] OR
     [approved Sign in with ChatGPT integration]
  -> optionally: authorized ГАРАНТ Connect API/MCP
  -> evidence-aware answer with source identifiers and edition date
```

Provider claims and legal verification must be separate: OpenAI generates text, ГАРАНТ Connect supplies source metadata when licensed and accessible. Never claim a live source check when unavailable. Keep permissions, tokens, quotas and legal rights validated outside model output.

## Deployment assumptions

A self-contained browser extension is the MVP. There is no justified VPS, database, local Windows service, account server or analytics platform at this stage. A trusted credential handler may become necessary only after Phase 2 authorization/model design is settled.
