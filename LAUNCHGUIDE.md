# CivicDataForge Government Evidence

## Tagline
Receipt-bound official public-record evidence for AI agents.

## Description
CivicDataForge gives MCP-compatible agents structured access to official public records through a credential-safe remote relay and installable stdio gateway. The default bundle exposes ten focused tools for U.S. property compliance, healthcare exclusions, restaurant and childcare oversight, EPA facility evidence, Norway company evidence, and cross-market routing. Results preserve source links, evidence boundaries, and receipt metadata rather than turning public records into unsupported eligibility or legal conclusions.

The hosted MCP endpoint supports public `initialize` and `tools/list` discovery. Tool execution uses the caller's own Apify account and API token; CivicDataForge does not embed a publisher token in this repository, the gateway, or returned evidence.

## Setup Requirements
- `X-Apify-Token` (required for hosted tool calls): Send a raw caller-owned Apify API token in this HTTP header. Create an Apify account and obtain a token at https://console.apify.com/account/integrations.
- `APIFY_TOKEN` (required for the local stdio gateway): Set the same caller-owned Apify token in the process environment before running `npm start`.
- Node.js 22 or newer (local stdio gateway only).

Public tool discovery does not require a token. Actor execution may consume Apify usage according to the selected Actor's Store pricing and limits.

## Category
Data & Analytics

## Features
- Ten focused MCP tools backed by official public-record sources
- Public, credential-free MCP initialization and tool discovery
- Credential-safe execution with the caller's own Apify token
- Receipt-bound evidence packets with source links and bounded uncertainty
- Short-term-rental permit evidence across supported U.S. jurisdictions
- Florida lodging-license and municipal property-violation research
- HHS-OIG healthcare exclusion candidate research
- Restaurant inspection and childcare licensing evidence
- EPA ECHO facility identity, inspection, compliance, and enforcement evidence
- Norwegian company evidence with NLOD 2.0 attribution boundaries
- Unified routing for supported U.S., India, global-screening, EPA, and China-facing intake tasks
- Explicit research-only boundaries for regulated and eligibility-sensitive uses

## Getting Started
- "List the CivicDataForge tools and tell me which one handles an Orlando STR permit check."
- "Use `str-permit-registry` to research official permit evidence for this supported property address."
- "Use `leie-exclusion-screening` to find review candidates for this provider name without making an identity or eligibility determination."
- "Use `epa-echo-facility-compliance` to retrieve bounded official facility evidence while keeping any safety conclusion UNKNOWN."
- Tool: `civicdataforge-evidence-gateway` — Routes a supported identifier or intake task to the appropriate minimized evidence workflow.
- Tool: `str-permit-registry` — Returns supported U.S. STR permit and license evidence.
- Tool: `fl-dbpr-vacation-rentals` — Returns Florida DBPR lodging-license evidence.
- Tool: `property-violations` — Returns supported municipal code and building-violation evidence.
- Tool: `leie-exclusion-screening` — Finds HHS-OIG LEIE review candidates without adjudicating identity.
- Tool: `restaurant-inspection-scores` — Returns supported official restaurant inspection evidence.
- Tool: `multistate-childcare-licensing` — Returns licensing, inspection, and deficiency evidence across supported states.
- Tool: `texas-childcare-licensing` — Returns Texas childcare operation and inspection evidence.
- Tool: `epa-echo-facility-compliance` — Returns bounded EPA ECHO facility evidence.
- Tool: `norway-company-evidence` — Returns exact-identifier or bounded-name Norwegian company evidence.

Hosted endpoint:

```text
https://civicdataforge.pages.dev/mcp
```

Local stdio gateway:

```bash
npm ci
APIFY_TOKEN=YOUR_APIFY_TOKEN npm start
```

## Tags
government-data, public-records, compliance-research, mcp, ai-agents, apify, property-data, short-term-rentals, healthcare, inspections, childcare, environmental-data, company-data, evidence, provenance

## Documentation URL
https://github.com/equinoxaifinance-rgb/civicdataforge-mcp#readme

## Health Check URL
https://civicdataforge.pages.dev/source-health.json
