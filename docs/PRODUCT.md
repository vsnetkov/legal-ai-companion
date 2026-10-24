# Product specification — Legal AI Companion

**State:** intended product scope; not a claim of shipped features.

## Problem

A user studying legal materials inside «ГАРАНТ» wants to ask a question about an explicitly selected passage without switching to a separate AI chat. Responses should be readable, evidence-oriented and clearly distinguish AI-generated explanations from source-verified legal information.

## Audience and environment

- Desktop end users who are authorized to use the internet version of «ГАРАНТ».
- Chrome, Opera, Firefox, Яндекс Браузер. Each must be manually tested before claiming support.
- Russian UI first. Accessibility and sensible narrow-window behavior are mandatory.

## Current MVP user journey (Phase 1 only)

1. Open an authorized page under `https://internet.garant.ru/*`.
2. Locate a single compact control for the add-on.
3. Select a text passage and intentionally request to capture it.
4. See a preview of exactly what will be submitted; selection length must be <= 12,000 characters.
5. Enter a short question or select a default question and click «Отправить».
6. Receive a **local deterministic demo response** with the exact disclosure «Демонстрационный ответ. Правовые нормы не проверялись».
7. Close the panel with its close control or Escape; the underlying ГАРАНТ page should remain functional.

No automatic extraction of full-page contents and **no** external AI/API call in Phase 1.

## User interface states

- Initial: idle, no selected text.
- Selection captured: text preview, length and optional question.
- Empty/too long: specific validation message; no submit.
- Mock answer: response and unmistakable demonstration status.
- Stale context: clear preview/answer or show a new-document warning after route/document change.
- Failed initialization: do not interfere with the site; show nonintrusive failure if possible.

## Future value (separately authorized phases)

- OpenAI: explain and compare selected text; no fabricated law references.
- ГАРАНТ Connect: authenticated searches, document metadata, edition dates and verifiable provenance, only within granted license/limits.
- User authorization: choose between an approved Sign in with ChatGPT mode (if available) and separately billed OpenAI API mode. Eligibility must come from real authorization, not user-entered plan names.
- No implicit automatic switch to a paid provider when usage is exhausted.

## Explicit non-goals of Phase 1

Server, database, OAuth, browser-native host, AI network calls, legal-document bulk extraction, multiuser administration, payments, analytics, chat history persistence, full document scraping, published marketplace release.

## Success measure for Phase 1

Complete the exact selection → preview → deliberate submit → clearly labeled local demo answer flow. Demonstrate relevant automated checks and identify any browser/ГАРАНТ scenarios that remain untested. `docs/ACCEPTANCE.md` is the acceptance checklist.
