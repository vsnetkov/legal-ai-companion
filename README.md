# Legal AI Companion by snetkov.ru

**Status:** Phase 1 implemented; automated checks pass, real-browser smoke tests remain pending.
**Date:** 2026-10-24. **Target:** Windows desktop browsers, first on the web edition of legal reference system «ГАРАНТ».

## Product in one paragraph

A separate browser extension embeds a compact legal AI assistant panel into `https://internet.garant.ru/*`. The user manually selects text, reviews its preview, and intentionally sends a question. The first implementation uses an entirely local demo reply. Later, independently approved phases may add OpenAI model access and authorized verification of legal materials through the official ГАРАНТ Connect API/MCP.

**Important:** Codex/OpenCode are development assistants, not the product's AI runtime. The end-user AI integration is ChatGPT/OpenAI, with actual entitlement determined by the selected connection method.

## What exists / does not exist

The repository now contains the Phase 1 extension source, automated tests and local Chromium/Firefox builds. There is still no verified ГАРАНТ integration, credential or live API connection. Real support for each target browser must not be claimed until its smoke test is run.

## Phase 1 — deliver only this now

- Browser extension for Chromium-based browsers and Firefox, with separate builds/adapters only where needed.
- A single launch control and a Shadow DOM panel on authorized ГАРАНТ pages.
- Manual selected-text capture, preview, explicit submit, and local mock response with mandatory disclosure: «Демонстрационный ответ. Правовые нормы не проверялись».
- A clear empty-selection error, a 12,000-character limit, safe text rendering, keyboard access, and SPA navigation resilience.
- No OpenAI/GARANT requests or keys, OAuth, Native Messaging, server, accounts, billing, analytics or persistent conversation history.

The four target browsers are **compatibility targets, not verified supported platforms** until each was actually tested.

## Development and local loading

```powershell
npm install
npm run typecheck
npm run build
npm test
```

- Load `dist/chromium` as an unpacked extension in Chrome, Opera or Яндекс Браузер.
- In Firefox, open `about:debugging#/runtime/this-firefox`, choose the temporary add-on action and select `dist/firefox/manifest.json`.
- On `https://internet.garant.ru`, select up to 12,000 characters, open the panel, capture the selection and click «Отправить». Confirm that the response is marked as demonstrational.
- On any other origin, confirm that the launch control is absent.

## Docs

- `HANDOFF_PROMPT.md` — **self-contained first task**. Can be used alone, even without the other files.
- `AGENTS.md` — repository-wide agent guardrails (use if the repo has no stronger instructions).
- `plan.md` — phase gates and status.
- `docs/PRODUCT.md` — user scenarios, scope, UX.
- `docs/ARCHITECTURE.md` — proposed minimal architecture and boundaries.
- `docs/INTEGRATIONS.md` — future OpenAI and ГАРАНТ connection paths, not yet implemented.
- `docs/SECURITY.md` — safety invariants and tests.
- `docs/ACCEPTANCE.md` — testable acceptance gates.
- `docs/DECISIONS.md` — decision record with proposal/verification state.
- `docs/SOURCES.md` — primary source links for later implementation.
- `CHANGELOG.md` — documentation change log.

## Hand off to Codex / OpenCode

Open the actual project folder, inspect the Git state, and send the **contents** of `HANDOFF_PROMPT.md` to the agent. The prompt explicitly handles missing files and empty projects. Do not ask it to execute phases beyond Phase 1.

Example folder on Windows: `C:\Projects\legal-ai-companion`. This is an example, not a verified existing directory. No fixed `npm` commands are specified until the agent inspects or creates the chosen package setup.

## Success and limitations

Phase 1 can be accepted only with actual relevant tests/builds and a browser test on ГАРАНТ, if the user provides an authorized session. A local fixture test alone is **not** proof that the extension works inside the real product.
