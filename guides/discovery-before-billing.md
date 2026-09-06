# Discover government-record tools before authorizing a billable run

CivicDataForge's public remote MCP discovery does not require an Apify token. Actual tool calls do. Keep those two steps separate when building an agent integration.

## Enumerate the current schema

Connect your Streamable HTTP MCP client to `https://civicdataforge.pages.dev/mcp`. Initialize and list tools without attaching a credential. Read the returned input schema rather than guessing parameters from the product name. The September 6 remote readback exposed ten focused Actor tools plus four run/storage helpers: `get-actor-run`, `get-dataset-items`, `get-key-value-store-record` and `abort-actor-run`. The installable stdio bundle and remote relay need not expose the same helper set. The broader [catalog](https://civicdataforge.pages.dev/api-catalog.json) contains additional products.

## Choose one supported job

For a property query, select a jurisdiction the corresponding Actor actually supports. For an exact company lookup, use the required identifier and country-specific source. A product covering one registry cannot establish worldwide coverage.

Before execution, inspect the Actor's current Store price, data source notes, input schema and output limits. Use your own Apify account and the raw token in the `X-Apify-Token` header. Never put a seller credential in a client, URL or source repository. Do not send your token to public issues or support.

## Preserve the receipt, not just the answer

Retain the run ID, dataset reference, source URL, source scope and timestamps. A lookup with no match can mean a supported negative search; it can also mean source unavailability, a mismatched identifier or an unsupported geography. Inspect explicit status fields before interpreting absence.

For production jobs, impose buyer-side time and spend limits and handle failed or timed-out runs without starting unlimited replacements. This tutorial makes no billable call. Public discovery and Store presence are not customer, payment or delivery evidence.

Start with the [gateway installation guide](../README.md) and [current product catalog](https://civicdataforge.pages.dev/government-data-api). For a scoped integration question, contact civicdataforgehq@gmail.com without sending credentials or sensitive subject data.
