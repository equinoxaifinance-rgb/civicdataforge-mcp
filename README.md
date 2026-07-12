# CivicDataForge — Civic & Public-Records Data (MCP)

MCP server exposing CivicDataForge's catalog of public-records and government open-data tools. Give your AI agent structured, pay-per-use access to permits, licensing, compliance, and civic datasets — sourced from official open-data portals, one clean schema per dataset.

Website: https://civicdataforge.pages.dev · Store: https://apify.com/civicdataforge

## Add to your MCP client

Add this one remote MCP server URL (works with Claude, Cursor, and any MCP-compatible client):

https://mcp.apify.com?tools=civicdataforge/leie-exclusion-screening,civicdataforge/str-permit-registry,civicdataforge/texas-childcare-licensing,civicdataforge/nyc-film-permits,civicdataforge/newsletter-data

Your agent authenticates with your own Apify key and pays per record — no separate signup. Powered by the Apify MCP gateway.

## Tools

| Tool | What it returns | For |
|------|-----------------|-----|
| leie-exclusion-screening | OIG LEIE exclusion screening by NPI + name; or the full list by state/specialty | healthcare compliance, credentialing |
| str-permit-registry | official city short-term-rental permit records (status, address, expiration) | proptech, lending, STR compliance |
| texas-childcare-licensing | licensed childcare operations + inspection/deficiency history | insurers, childcare SaaS, franchises |
| nyc-film-permits | NYC film/TV shooting permits — exact streets, dates, category | location scouts, production services |
| newsletter-data | Substack archive + benchmark analytics (paid ratio, cadence, engagement) | media intel, ad-buyers |

More datasets ship continuously — property violations, music-publishing splits, multi-state childcare, LA/West Hollywood film permits, and more. See the full catalog at https://civicdataforge.pages.dev and https://apify.com/civicdataforge.

## License

MIT. Data sourced from public government open-data portals, accessed logged-out.
