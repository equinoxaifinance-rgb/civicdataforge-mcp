# Discover government-record tools before authorizing a billable run

CivicDataForge's public remote MCP discovery does not require a credential. Execution requires the credential for the chosen route: an issued CivicDataForge key for the bounded first-party evidence gateway, or the caller's own Apify token for direct Actor and run-management access. Keep discovery, authorization, execution and billing separate.

## Enumerate the current schema

Connect your Streamable HTTP MCP client to `https://civicdataforge.pages.dev/mcp`. Initialize and list tools without attaching a credential. Read the returned input schema rather than guessing parameters from the product name. A September 23, 2026 remote readback exposed ten focused Actor tools plus four run/storage helpers: `get-actor-run`, `get-dataset-items`, `get-key-value-store-record` and `abort-actor-run`. Discovery does not grant access to every listed tool: the first-party key is limited to its bounded evidence workflow; generic run/storage helpers require caller-owned Apify access. The installable stdio bundle and remote relay need not expose the same helper set. The broader [catalog](https://civicdataforge.pages.dev/api-catalog.json) contains additional products.

## Choose one supported job

For a property query, select a jurisdiction the corresponding Actor actually supports. For an exact company lookup, use the required identifier and country-specific source. A product covering one registry cannot establish worldwide coverage.

Choose the commercial route before execution:

- **First-party gateway:** follow the current [agent connection guide](https://civicdataforge.pages.dev/connect-agent) and [API contract](https://civicdataforge.pages.dev/openapi/civicdataforge-evidence-api-v1.json). Use the issued CivicDataForge key in `Authorization: Bearer YOUR_CIVICDATAFORGE_KEY` or `X-CivicDataForge-Key`. Preserve a stable idempotency key for retries. This is not general access to the seller's Apify account.
- **Direct Apify:** inspect the Actor's current Store price, source notes, input schema and output limits. Use your own Apify account and raw token in `X-Apify-Token` for direct Actor and run-management calls.

Do not send both credential types in one request or substitute one for the other. Never put credentials in a URL, source repository, public issue or support message. Inspect the current offer before granting payment authority; a successful discovery request is not a purchase.

## Preserve the receipt, not just the answer

Retain the run ID, dataset reference, source URL, source scope and timestamps. A lookup with no match can mean a supported negative search; it can also mean source unavailability, a mismatched identifier or an unsupported geography. Inspect explicit status fields before interpreting absence.

For production jobs, impose buyer-side time and spend limits and handle failed or timed-out runs without starting unlimited replacements. This tutorial makes no billable call. Public discovery and Store presence are not customer, payment or delivery evidence.

Start with the [gateway installation guide](../README.md) and [current product catalog](https://civicdataforge.pages.dev/government-data-api). For a scoped integration question, contact civicdataforgehq@gmail.com without sending credentials or sensitive subject data.
