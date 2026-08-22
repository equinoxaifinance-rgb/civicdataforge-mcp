# CivicDataForge — Official Public-Records Data for AI Agents

[![CivicDataForge MCP server](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp/badges/card.svg)](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp)
[![CivicDataForge MCP quality score](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp/badges/score.svg)](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp)

CivicDataForge gives MCP-compatible agents structured access to official government records through the
Apify MCP gateway. The official bundle exposes seven focused tools across property compliance, healthcare
integrity, and regulated-facility safety. Additional research products remain discoverable in the public
catalog without bloating the default MCP tool set.

Website: <https://civicdataforge.pages.dev>

Government data catalog: <https://civicdataforge.pages.dev/government-data-api>

Machine-readable catalog: <https://civicdataforge.pages.dev/api-catalog.json>

Apify Store: <https://apify.com/civicdataforge>

Live STR proof: <https://apify.com/civicdataforge/str-permit-registry/examples/check-orlando-str-permits>

Dated product proof: <https://civicdataforge.pages.dev/proof>

## Add the remote MCP server

Use this Streamable HTTP endpoint:

```text
https://mcp.apify.com/?tools=civicdataforge/str-permit-registry,civicdataforge/fl-dbpr-vacation-rentals,civicdataforge/property-violations,civicdataforge/leie-exclusion-screening,civicdataforge/restaurant-inspection-scores,civicdataforge/multistate-childcare-licensing,civicdataforge/texas-childcare-licensing
```

Send your Apify API token in the `Authorization` header:

```text
Authorization: Bearer YOUR_APIFY_TOKEN
```

An Apify account and API token are required. Each Actor has its own pricing, input schema, source notes, and
usage limits on its Store page.

## Run the installable stdio gateway

This repository also contains a credential-safe stdio distribution for MCP clients and Glama deployments.
Its seven schemas are available during discovery without a credential. Calls require the installing user's
own `APIFY_TOKEN`; the gateway never embeds a developer token and never returns the token in results.

```bash
npm ci
APIFY_TOKEN=YOUR_APIFY_TOKEN npm start
```

For an MCP client, use `node /absolute/path/to/server.mjs` as the command and supply `APIFY_TOKEN` through
the client's secret environment configuration. Successful calls return the Apify run ID, dataset ID, status,
and up to 1,000 dataset rows. Larger outputs remain available from the caller-owned Apify dataset.

### npm and ModelScope configuration

After the public npm package is released, MCP clients and ModelScope can use the portable STDIO command
below. The package does not contain a CivicDataForge or Apify credential. Tool discovery works without a
token; each caller supplies `APIFY_TOKEN` for actual Actor runs.

```json
{
  "mcpServers": {
    "civicdataforge": {
      "command": "npx",
      "args": ["-y", "civicdataforge-mcp-gateway@latest"],
      "env": {
        "APIFY_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

Do not use this package name as a live install instruction until the npm registry returns the published
version. The GitHub source checkout and hosted Apify MCP endpoint remain the current working paths before
that release receipt exists.

## Current tools

| Tool | What it returns | Typical workflow |
|---|---|---|
| `str-permit-registry` | Official STR permit/license status, address, dates, source links, and normalized jurisdiction fields across 29 supported US jurisdictions | Property compliance, registry monitoring, and municipal research |
| `fl-dbpr-vacation-rentals` | Florida DBPR lodging-license records across seven official district files | State-license validation and property diligence |
| `property-violations` | Normalized code and building-violation records from supported municipal sources | Property compliance research and monitoring |
| `leie-exclusion-screening` | HHS-OIG LEIE records filtered by name, NPI, state, specialty, or exclusion type | Healthcare compliance and credentialing support |
| `restaurant-inspection-scores` | Official restaurant inspection and violation records across seven supported jurisdictions | Facility safety research and monitoring |
| `multistate-childcare-licensing` | Supported state childcare licensing, inspection, and deficiency fields | Multi-state facility research |
| `texas-childcare-licensing` | Licensed childcare operations with inspection and deficiency fields where the state publishes them | Facility research and compliance support |

The official bundle is intentionally limited to the seven flagship tools. India company-registry and NYC
film-permit products remain available through their Actor pages and focused suite-specific MCP URLs in the
public catalog.

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

This repository publishes discovery metadata for the hosted remote MCP endpoint and an installable stdio
gateway that dispatches the same seven tools to Apify; the data Actors still run on Apify. Gateway code,
metadata, and documentation are licensed under the included [MIT License](LICENSE). Government-source terms
and record-level use restrictions remain source-specific and are documented on the corresponding Actor pages.
