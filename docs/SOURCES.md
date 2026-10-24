# External technical references

Links below are **official primary documentation** relevant to later implementation. A link is not proof of access, approval, current API limits or cross-browser behavior in our product. Recheck before each integration phase.

## OpenAI

- [Using your ChatGPT plan in other apps and sites](https://help.openai.com/en/articles/20001542-using-your-chatgpt-plan-in-other-apps-and-sites) — plan eligibility, user permissions, limits and separation from normal API billing. Reviewed 2026-10-24; supported commercial plan usage described for Go, Plus and Pro in participating apps, subject to consent.
- [Sign in with ChatGPT — Quickstart](https://developers.openai.com/siwc/quickstart) — entry point for supported site/plugin/open-source sign-in flows; confirm current partner approval requirements before integrating.
- [OpenAI platform documentation](https://platform.openai.com/docs/overview) — separate API product and billing; the API is not interchangeable with a ChatGPT subscription.

## ГАРАНТ

- [ГАРАНТ Коннект API/MCP документация](https://www.garant.ru/mobileonline/api/documentation/) — REST API and remote MCP documentation; version 2.3.0 at documentation review, with bearer token requirement, legal information operations and applicable quotas. Use official current schemas and authenticated access; do not assume public unauthenticated access.

## Browser extension standards

- [MDN — Anatomy of a WebExtension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension) — content scripts, extension components.
- [MDN — Manifest background and cross-browser MV3 behavior](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background) — differences between background service worker support and background scripts/event pages.
- [Chrome Extensions documentation](https://developer.chrome.com/docs/extensions/) — MV3 manifest, permissions and extension publication.

## Validation policy

When official docs conflict in eligibility wording, prefer the most recent specific program documentation and test actual authorization/entitlements using approved accounts. Keep `NOT VERIFIED` rather than inferring support. This source file is a reading list, not an automated compliance verdict.
