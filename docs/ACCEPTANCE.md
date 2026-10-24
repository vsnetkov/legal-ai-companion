# Acceptance criteria — Phase 1 (demo only)

**Verification statuses:** `PASS`, `FAIL`, `NOT RUN` for test execution; `NOT VERIFIED` for criteria without evidence. A build result is not the same as a browser smoke result.

| ID | Criterion | Suggested evidence |
| --- | --- | --- |
| AC-01 | Extension activates only for `https://internet.garant.ru/*` | Manifest + host check tests |
| AC-02 | One button/one panel; repeat mount does not duplicate UI | DOM integration test |
| AC-03 | Shadow DOM styles do not override host page | DOM test; actual browser smoke if available |
| AC-04 | User explicitly captures and previews selected text | Interaction test |
| AC-05 | Empty selection and >12,000 chars produce safe errors | Boundary tests |
| AC-06 | Submit gives deterministic local reply with exact disclaimer | Provider and UI tests |
| AC-07 | No external network request or automatic document extraction | Code/network check + test |
| AC-08 | HTML-looking selected text is inert | XSS regression test |
| AC-09 | Tab, Escape, visible focus and stale-route handling function | DOM/manual smoke |
| AC-10 | Chromium and Firefox distributions build | Actual build command/output checks |
| AC-11 | Existing modified/staged/untracked work remains unchanged | Initial/final Git status + diff review |

## Minimum test scenarios

1. Wrong host or `http://` must not activate the extension.
2. Reinitialize the extension twice; exactly one panel is present.
3. Select ordinary Cyrillic text; preview exactly matches selection.
4. Click «Отправить» and confirm the mock reply disclaimer.
5. Empty selection and 12,001-character selection are rejected without external I/O.
6. Selected text containing `<script>`, `<img onerror=...>` and Markdown escapes must remain inert text.
7. Navigate to a different document/route and confirm previously captured context is not silently reused.
8. Operate entirely from keyboard; Escape closes the panel.
9. Verify generated manifests have no unnecessary host or sensitive permissions.
10. Browser-specific: load extension and repeat the flow in Chrome, Opera, Firefox and Яндекс Браузер as available; record versions and `NOT RUN` for inaccessible browsers.

## Finish report template

| Check | Command or method | Status | Observed result or limitation |
| --- | --- | --- | --- |
| `typecheck` | actual project script | PASS/FAIL/NOT RUN | ... |
| `lint` | actual project script | PASS/FAIL/NOT RUN | ... |
| `tests` | actual project script | PASS/FAIL/NOT RUN | ... |
| Chromium build | actual project script | PASS/FAIL/NOT RUN | ... |
| Firefox build | actual project script | PASS/FAIL/NOT RUN | ... |
| Browser smoke | browser/version | PASS/FAIL/NOT RUN | ... |
| Manifest/secret review | inspected outputs | PASS/FAIL/NOT RUN | ... |
| Git diff | `git diff --check` etc. if applicable | PASS/FAIL/NOT RUN | ... |

A **PASS** for Phase 1 requires meaningful evidence for the implemented surface and an explicit disclosure of any unavailable real-ГАРАНТ/browser checks. Any absent evidence is not automatically PASS.
