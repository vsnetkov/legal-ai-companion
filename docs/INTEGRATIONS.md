# Integrations and ChatGPT plan matrix

**All integrations are deferred beyond Phase 1.** This document records decision gates, not an implemented protocol. Recheck the current official API terms before writing production code.

## 1. Do not confuse identity, plan usage and API billing

Three different concepts:

1. **Sign in with ChatGPT identity:** login to a participating application using a ChatGPT account; signing in alone does not mean the app can bill usage against that subscription.
2. **Optional ChatGPT plan usage in participating apps:** a separately authorized, partner-dependent feature for eligible users. The OpenAI Help Center (checked 2026-10-24) states Go, Plus and Pro are eligible in supported commercial apps that expose it. App participation and user consent are still required.
3. **OpenAI API:** separate developer billing and authentication; a personal ChatGPT subscription does not automatically cover ordinary API traffic.

Open-source client integration has its own documented authorization conditions. **Do not assume that labeling the add-on open-source grants an unrestricted commercial integration.**

## 2. User plan behavior — design, not entitlement promise

| ChatGPT plan | Participate in sign-in? | Use ChatGPT plan for AI requests in our extension? |
| --- | --- | --- |
| Free | May sign in if the app supports it | Not assumed for commercial app; use an approved separate mode |
| Go | May sign in if supported | Possible only in approved participating app and with user opt-in |
| Plus | May sign in if supported | Possible only in approved participating app and with user opt-in |
| Pro | May sign in if supported | Possible only in approved participating app and with user opt-in |
| Business | Organization policy applies | Do not assume plan-usage entitlement; verify current program and admin controls |
| Enterprise | Organization policy applies | Do not assume plan-usage entitlement; verify current program and admin controls |
| Edu | Organization policy applies | Do not assume plan-usage entitlement; verify current program and admin controls |

Never detect a user's plan from browser cookies or assume it based on an email domain. Prefer returned authorized capabilities and explicit errors. When usage runs out, show a reason and user-controlled options; never charge a second payment provider automatically.

## 3. Future OpenAI API mode

- Decide whether the user brings their own API credentials or the application operator bills usage. Each approach needs its own privacy/cost policy.
- Do not put shared secret API keys in extension source, build, local storage or query parameters. Browser-side user secrets require a separate explicit security design; a trusted service or local OS-keychain integration may be needed.
- Require explicit user action before sending legal excerpts and transparent notice of destination/provider; establish data retention and consent policies.
- Limit request size, token spend, retries, concurrency and error logging.
- Never provide fabricated legal citations; identify unverified AI text as such.

## 4. Future ГАРАНТ Connect mode

Official documentation: `https://www.garant.ru/mobileonline/api/documentation/` (API v2.3.0 at time of drafting).

- Authorized API requires a valid bearer token and applicable license/scopes.
- REST (`api.garant.ru`) and MCP (`mcp.garant.ru`) are alternative documented transports; the remote MCP interface reflects REST capabilities and limits.
- First implement only targeted read/search operations as required, such as document info, edition metadata and search. Avoid export and bulk retrieval by default.
- Use returned identifiers and edition dates; verify applicable edition and source links. Do not invent source metadata.
- Query current account quotas and enforce them; avoid assuming published numeric limits remain unchanged.
- Check legal terms governing transfer of licensed text to third-party AI models before enabling it.

## 5. Gates before future implementation

- Verify current OpenAI Sign in with ChatGPT commercial/OSS access process and exact account scopes.
- Verify whether embedding in a browser extension is an approved app form and which OAuth redirect constraints apply.
- Verify OpenAI plan-usage eligibility at runtime on real authorized test accounts, not UI guesses.
- Verify official ГАРАНТ endpoint/tool schemas and contractual access on an authorized account.
- Document billing/consent and data handling; require a new task and explicit owner authorization.

## References

- https://help.openai.com/en/articles/20001542-using-your-chatgpt-plan-in-other-apps-and-sites
- https://developers.openai.com/siwc/quickstart
- https://platform.openai.com/docs/overview
- https://www.garant.ru/mobileonline/api/documentation/
