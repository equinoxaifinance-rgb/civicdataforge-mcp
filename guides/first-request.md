# Check one government-evidence request before paying

Start here: [interactive request check](https://civicdataforge.pages.dev/connect-agent?utm_source=github&utm_medium=developer&utm_campaign=first_request_20260925#try-request).

An agent integration has two different questions: **is this valid input?** and **what do the sources actually establish?** Do not pay to discover a malformed request, and do not confuse an accepted request with a finding.

## 1. Discover current examples — no credential

```sh
curl https://civicdataforge.pages.dev/api/quote
```

Use `supported_tasks[].example_quote_request` from that response rather than guessing a field name. Examples include U.S. property, India company, and EPA facility evidence. Availability is bounded by the task and issuing sources, not a promise of universal coverage.

## 2. Check an example — no purchase

```sh
curl -X POST https://civicdataforge.pages.dev/api/quote \
  -H 'Content-Type: application/json' \
  -d '{"task":"us_property_decision","subject":{"address":"400 S Orange Ave","city":"Orlando","state":"FL"}}'
```

This is a public example address, not a claim that it has an STR permit. You may substitute another public identifier within the supported contract. Never put an API key or private information in the JSON subject.

Inspect `quote_state` and `charged`. `READY` with `charged: false` means the input was accepted and purchase options were available at that time. **It does not mean a permit was found, a company was cleared, or an evidence packet was retrieved.** `NEEDS_INPUT`, `INVALID_INPUT`, `UNSUPPORTED`, and `PAYMENT_RAIL_UNAVAILABLE` tell the caller to correct input or stop rather than buy blindly.

The response includes its expiry, nonbinding pricing reference, paid routes, and output contract. Final purchase terms govern; the quote itself never buys anything.

## 3. Choose a paid route explicitly

- For the hosted REST/MCP gateway, use the [AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-6sjgyotxqa22o), complete account setup, and use the issued CivicDataForge key.
- For a caller-owned Actor run, inspect the [Apify product](https://apify.com/civicdataforge/civicdataforge-evidence-gateway) and its current terms. Keep an explicit spending limit.

Full [connection instructions](https://civicdataforge.pages.dev/connect-agent#connect) and the [REST contract](https://civicdataforge.pages.dev/openapi/civicdataforge-evidence-api-v1.json) describe credentials and idempotency. Do not send both credential types, and do not send a CivicDataForge key to Apify.

## 4. Keep the evidence boundary in the result

After a paid request, keep source links, request scope, observation dates, decision state, and receipt hash together. Missing records and unavailable sources are different. An honest `REVIEW_REQUIRED` or `SOURCE_UNAVAILABLE` packet is not legal clearance. This is research infrastructure, not a consumer report or an eligibility decision.

This guide and input check are public. They do not include the private collection engine or bypass paid fulfillment.
