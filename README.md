# CivicDataForge — Official Public-Records Data for AI Agents

[![CivicDataForge MCP server](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp/badges/card.svg)](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp)
[![CivicDataForge MCP quality score](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp/badges/score.svg)](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp)

CivicDataForge gives MCP-compatible agents structured access to official government records through the
Apify MCP gateway. The current bundle focuses on short-term-rental permits, federal healthcare exclusions,
childcare licensing and compliance, and NYC film permits.

Website: <https://civicdataforge.pages.dev>

Apify Store: <https://apify.com/civicdataforge>

Live STR proof: <https://apify.com/civicdataforge/str-permit-registry/examples/check-orlando-str-permits>

Dated product proof: <https://civicdataforge.pages.dev/proof>

## Add the remote MCP server

Use this Streamable HTTP endpoint:

```text
https://mcp.apify.com/?tools=civicdataforge/leie-exclusion-screening,civicdataforge/str-permit-registry,civicdataforge/texas-childcare-licensing,civicdataforge/nyc-film-permits
```

Send your Apify API token in the `Authorization` header:

```text
Authorization: Bearer YOUR_APIFY_TOKEN
```

An Apify account and API token are required. Each Actor has its own pricing, input schema, source notes, and
usage limits on its Store page.

## Current tools

| Tool | What it returns | Typical workflow |
|---|---|---|
| `str-permit-registry` | Official STR permit/license status, address, dates, source links, and normalized jurisdiction fields across 29 supported US jurisdictions | Property compliance, registry monitoring, and municipal research |
| `leie-exclusion-screening` | HHS-OIG LEIE records filtered by name, NPI, state, specialty, or exclusion type | Healthcare compliance and credentialing support |
| `texas-childcare-licensing` | Licensed childcare operations with inspection and deficiency fields where the state publishes them | Facility research and compliance support |
| `nyc-film-permits` | NYC film and television permit locations, dates, boroughs, categories, and precincts | Location research and production planning |

## Fastest proof path

The public Orlando task runs the STR Actor with a bounded input and exposes the resulting official records,
field structure, source links, and integration routes:

<https://apify.com/civicdataforge/str-permit-registry/examples/check-orlando-str-permits>

For a downloadable evaluation artifact, the website publishes a 100-row STR sample covering all 29 supported
jurisdictions together with a SHA-256 checksum:

<https://civicdataforge.pages.dev/str-permit-sample>

## Use boundary

These tools support research and compliance workflows. They are not consumer reports and must not be used as
the sole basis for credit, insurance, employment, housing, or other eligibility decisions. Preserve the
official source links and review the source-specific limitations documented by each Actor.

## Repository scope and license

This repository publishes discovery and connection metadata for the hosted remote MCP endpoint; the data
Actors run on Apify. Repository metadata and documentation are licensed under the included [MIT License](LICENSE). Government-source terms and
record-level use restrictions remain source-specific and are documented on the corresponding Actor pages.
