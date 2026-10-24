# Delivery plan — Legal AI Companion

**Documented plan, not execution status.** No phase is reported implemented by this archive.

## Phase 0 — inspect existing state (part of the Phase 1 handoff)

- [ ] Read `AGENTS.md` if present, `HANDOFF_PROMPT.md`, actual package/build/test files and relevant code.
- [ ] Record Git branch/HEAD/status and worktree rules; preserve all existing changes.
- [ ] Establish actual authenticated UI access to ГАРАНТ or report fixture-only testing.
- [ ] Record baseline/known blockers; do not assume proposed architecture matches repository code.

## Phase 1 — local browser MVP (CURRENT TASK)

- [ ] Narrow host activation to `https://internet.garant.ru/*` (verify actual route constraints).
- [ ] Add button + Shadow DOM panel with CSS separated; prevent duplicate injection.
- [ ] Capture only explicitly selected text; show preview before submission.
- [ ] Handle empty selection, 12,000-character maximum, stale context, Escape and keyboard focus.
- [ ] Return local demo reply with clear unverified label; absolutely no external AI/legal queries.
- [ ] Build for Chromium and Firefox; smoke-test Chrome, Opera, Firefox and Яндекс separately when accessible.
- [ ] Add small automated tests, review permissions/secrets, update only necessary docs, report what was actually checked.

**Gate 1:** All relevant Phase 1 acceptance criteria have evidence, or failures are explicitly left open. Stop here and request a separate instruction.

## Phase 2 — one real model connection (NOT AUTHORIZED NOW)

- [ ] Choose **one** mechanism after verifying current OpenAI product terms and the intended deployment model.
- [ ] If OpenAI API: protect credentials in an authorized trusted component; user explicitly consents to transfers and costs; enforce quotas.
- [ ] Handle network failures, access revocation, data retention and safe error messages.
- [ ] Verify security with tests before production use.

## Phase 3 — ГАРАНТ Connect (NOT AUTHORIZED NOW)

- [ ] Obtain licensed API/MCP access through authorized channels; verify contractual permissions, API limits and current schemas.
- [ ] Verify source IDs, redaction effective dates, claim provenance and errors; do not invent citations.
- [ ] Ensure no unauthorized mass extraction or retention of legal texts.

## Phase 4 — Sign in with ChatGPT (NOT AUTHORIZED NOW)

- [ ] Confirm official commercial partnership/open-source eligibility, supported platform and current OAuth requirements.
- [ ] Sign-in and subscription-based model use are separate permissions; feature-detect available entitlements.
- [ ] Test Free, Go, Plus, Pro, Business, Enterprise/Edu behavior **only on authorized accounts**; do not infer eligibility from plan label.
- [ ] No implicit billing fallback or cookie/session scraping.

## Phase 5 — packaging/release (NOT AUTHORIZED NOW)

- [ ] Real browser compatibility matrix, security/privacy review, license and naming check.
- [ ] Store-specific signing, disclosure and publication only after owner approval.
