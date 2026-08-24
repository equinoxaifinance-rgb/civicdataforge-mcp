# CivicDataForge — Official Public-Records Data for AI Agents

[![CivicDataForge MCP server](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp/badges/card.svg)](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp)
[![CivicDataForge MCP quality score](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp/badges/score.svg)](https://glama.ai/mcp/servers/equinoxaifinance-rgb/civicdataforge-mcp)
[![AllMCPs Verified](https://allmcps.com/api/badge/civicdataforge-government-evidence)](https://allmcps.com/mcp/civicdataforge-government-evidence?verify=6641b3ab-b25c-4414-a18a-8dfc47acf45e)
[![Listed on mcpservers.org](https://mcpservers.org/badge.svg)](https://mcpservers.org/servers/equinoxaifinance-rgb/civicdataforge-mcp)

CivicDataForge gives MCP-compatible agents structured access to official government records through a stable
credential-safe MCP relay backed by Apify. The official bundle exposes ten focused tools across unified evidence routing, property compliance, healthcare
integrity, regulated-facility safety, and Norwegian company evidence. Additional research products remain discoverable in the public
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
https://civicdataforge.pages.dev/mcp
```

Public `initialize` and `tools/list` discovery work without a credential. For tool calls, send your raw Apify API token in the `X-Apify-Token` header:

```text
X-Apify-Token: YOUR_APIFY_TOKEN
```

An Apify account and API token are required. Each Actor has its own pricing, input schema, source notes, and
usage limits on its Store page.

## Run the installable stdio gateway

This repository also contains a credential-safe stdio distribution for MCP clients and Glama deployments.
Its ten schemas are available during discovery without a credential. Calls require the installing user's
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

## 简体中文：接入与使用边界

CivicDataForge 为支持 MCP 的智能体提供结构化政府公开记录。默认网关包含统一证据路由器与九个聚焦工具，覆盖
房产合规、医疗排除名单、受监管设施安全与挪威企业证据。每条结果都应保留官方来源链接、覆盖范围与对应
Actor 的数据限制；这些数据用于研究和合规辅助，不替代主管机关的最终认定。

当前可用的远程 Streamable HTTP 接入地址为：

```text
https://civicdataforge.pages.dev/mcp
```

公开的 `initialize` 与 `tools/list` 无需凭证。执行工具时，调用方需要自己的 Apify 账户与 API Token，并通过
`X-Apify-Token: YOUR_APIFY_TOKEN` 传递。CivicDataForge 不在仓库、npm 包或返回结果中嵌入发布者 Token。

简体中文完整接入手册提供两个从单一标识符到证据凭证的可复制路径：一个已支持美国辖区的
物业地址，以及一个印度公司 CIN。手册明确列出同步 REST 端点、输入、来源字段、新鲜度字段、
SHA-256 凭证和生产异步运行方式：

<https://civicdataforge.pages.dev/zh-cn-developer>

机器可读版本：<https://civicdataforge.pages.dev/zh-cn-developer.json>

印度公司 Actor 不在十工具默认网关中；需要时可通过统一证据路由器调用或单独加载：

```text
https://mcp.apify.com/?tools=civicdataforge/india-company-registry
```

该中文入口只提供现有美国房产证据和印度公司证据，不声称中国企业登记数据库、GSXT 批量
API 或中国本地官方记录覆盖。

npm 包正式发布并经注册表回读验证后，ModelScope 与本地 MCP 客户端可使用以下 STDIO 配置：

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

在 npm 注册表返回已发布版本之前，请勿把上述包名当作当前可用的安装路径；目前可用路径是
本仓库源码或上方 Apify 托管网关。十个默认工具包括统一证据路由器、短租许可、佛罗里达州住宿执照、
房产违规、HHS-OIG LEIE 医疗排除名单、餐厅检查、多州与德州托育许可、EPA ECHO 设施证据和挪威企业证据。

挪威企业数据适用 NLOD 2.0，可在遵守署名、变更说明及其他许可条件下商业再利用；但若记录含个人数据，
购买方仍须针对自己的处理目的审查隐私义务与合法依据。该 Actor 排除自然人角色、联系人和街道地址行，
且不输出 KYC、采购、制裁或资格裁决。

这些工具不是消费者报告，不得作为信贷、保险、就业、住房或其他资格决定的唯一依据。
使用者应核对原始政府记录，并遵守每个数据源的适用条款和限制。

## Current tools

| Tool | What it returns | Typical workflow |
|---|---|---|
| `civicdataforge-evidence-gateway` | One minimized, rights-labeled packet across U.S., India, global screening, EPA, or China-facing intake tasks, with monitoring and optional transaction state | Route one identifier to the correct evidence workflow without losing provenance or uncertainty |
| `str-permit-registry` | Self-service address evidence decisions plus official STR permit/license records, dates, source links, and normalized jurisdiction fields across 30 supported US jurisdictions | Property verification, portfolio research, registry monitoring, and municipal research |
| `fl-dbpr-vacation-rentals` | Florida DBPR lodging-license records across seven official district files | State-license validation and property diligence |
| `property-violations` | Normalized code and building-violation records from supported municipal sources | Property compliance research and monitoring |
| `leie-exclusion-screening` | HHS-OIG LEIE records filtered by name, NPI, state, specialty, or exclusion type | Healthcare compliance and credentialing support |
| `restaurant-inspection-scores` | Official restaurant inspection and violation records across seven supported jurisdictions | Facility safety research and monitoring |
| `multistate-childcare-licensing` | Supported state childcare licensing, inspection, and deficiency fields | Multi-state facility research |
| `texas-childcare-licensing` | Licensed childcare operations with inspection and deficiency fields where the state publishes them | Facility research and compliance support |
| `epa-echo-facility-compliance` | Bounded EPA ECHO facility identity, published compliance status, inspections, enforcement summaries, and evidence receipts | Facility research with environmental-safety verdict fixed to UNKNOWN |
| `norway-company-evidence` | Exact nine-digit organisation-number or bounded company-name evidence from Brønnøysundregistrene, with NLOD attribution, explicit match states, and receipt hashes | Norwegian entity verification, supplier onboarding evidence, and procurement research without an eligibility verdict |

The official bundle is intentionally limited to the unified gateway plus nine focused tools. India company-registry, cross-border restricted-party evidence, and NYC
film-permit products remain available through their Actor pages and focused suite-specific MCP URLs in the
public catalog.

### Norway source-rights and availability boundary

The Norway Actor uses the official Brønnøysundregistrene Central Coordinating Register for Legal Entities and labels output under the [Norwegian Licence for Open Government Data (NLOD) 2.0](https://data.norge.no/nlod/en/2.0). NLOD permits commercial copying, modification, combination, and distribution subject to attribution, change disclosure, and its exclusions. That permission does not replace a buyer-specific privacy and legal-basis review where a record bears personal data. The Actor deliberately omits natural-person roles, direct contacts, and street address lines.

The 2026-08-23 logged-out readback returned HTTP 200 for both the [public Store page](https://apify.com/civicdataforge/norway-company-evidence) and Actor API. The API identifies public Actor `L9veafufAtLFNgiWP` and binds both `latest` and `norway-public-candidate` to successful build `mnKblLCjPc0BdqrME`, version `0.1.3`. The provider deployment receipt records bounded owned canary run `6xyIIolQYf3d1u0KR` as `SUCCEEDED` with one exact-identifier `MATCH` for organisation number `974760673`; this is deployment verification, not external customer usage. The canary run and dataset objects are not public evidence surfaces—their logged-out API routes returned HTTP 403—so use the public Actor/API metadata plus caller-owned run receipts for downstream verification.

## Fastest proof path

The public Orlando task runs the STR Actor with a bounded input and exposes the resulting official records,
field structure, source links, and integration routes:

<https://apify.com/civicdataforge/str-permit-registry/examples/check-orlando-str-permits>

For a downloadable evaluation artifact, the website publishes a 100-row STR sample covering the verified
29-jurisdiction evaluation release together with a SHA-256 checksum:

<https://civicdataforge.pages.dev/str-permit-sample>

## Use boundary

These tools support research and compliance workflows. They are not consumer reports and must not be used as
the sole basis for credit, insurance, employment, housing, or other eligibility decisions. Preserve the
official source links and review the source-specific limitations documented by each Actor.

## Reliability before execution

Agents can inspect the public, receipt-bound reliability surfaces before spending compute or treating a
publisher response as usable:

- Source-level status and component reasons: <https://civicdataforge.pages.dev/source-health.json>
- Cross-market scope, refresh target, and fail-closed rules: <https://civicdataforge.pages.dev/reliability.json>

The China-facing route is a Simplified-Chinese integration layer over the named U.S. and India products. It
does not claim a China-native registry or bulk access to Chinese government records.

## Repository scope and license

This repository publishes discovery metadata for the hosted remote MCP endpoint and an installable stdio
gateway that dispatches the same ten tools to Apify; the data Actors still run on Apify. Gateway code,
metadata, and documentation are licensed under the included [MIT License](LICENSE). Government-source terms
and record-level use restrictions remain source-specific and are documented on the corresponding Actor pages.
