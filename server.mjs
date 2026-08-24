#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { ApifyClient } from "apify-client";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const TOOL_SPECS = [
  {
    name: "civicdataforge-evidence-gateway",
    title: "CivicDataForge Evidence Gateway",
    actorId: "civicdataforge/civicdataforge-evidence-gateway",
    schema: "civicdataforge-evidence-gateway.json",
    description: "Use for routing a supported U.S. property, India company or supplier, restricted-party, EPA facility, or rights-first China-facing intake task into one minimized, receipt-bound packet. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
  {
    name: "str-permit-registry",
    title: "US STR Permit Registry",
    actorId: "civicdataforge/str-permit-registry",
    schema: "str-permit-registry.json",
    description: "Use for address, permit-ID, or jurisdiction research across 30 supported US short-term-rental permit sources. For Florida statewide DBPR lodging licenses, use fl-dbpr-vacation-rentals instead. Address mode preserves explicit evidence decisions, scope, and receipts. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
  {
    name: "fl-dbpr-vacation-rentals",
    title: "Florida DBPR Vacation-Rental Licenses",
    actorId: "civicdataforge/fl-dbpr-vacation-rentals",
    schema: "fl-dbpr-vacation-rentals.json",
    description: "Use for Florida statewide DBPR vacation-rental and lodging-license evidence. For municipal STR permits use str-permit-registry; for code violations use property-violations. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
  {
    name: "property-violations",
    title: "Municipal Property Violations",
    actorId: "civicdataforge/property-violations",
    schema: "property-violations.json",
    description: "Use for municipal building, property, and code-violation research in supported jurisdictions. Do not use for STR licensing or restaurant health inspections; choose the corresponding permit or inspection tool. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
  {
    name: "leie-exclusion-screening",
    title: "HHS-OIG LEIE Exclusion Screening",
    actorId: "civicdataforge/leie-exclusion-screening",
    schema: "leie-exclusion-screening.json",
    description: "Use to find review candidates in the HHS-OIG LEIE by name, valid NPI, state, specialty, or exclusion type. Do not treat a candidate match as identity adjudication or use this tool for facility licensing. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without changing the source list.",
  },
  {
    name: "restaurant-inspection-scores",
    title: "Restaurant Inspection Scores",
    actorId: "civicdataforge/restaurant-inspection-scores",
    schema: "restaurant-inspection-scores.json",
    description: "Use for official restaurant inspection scores, violations, and facility-history research in supported jurisdictions. Do not use for general property-code violations or childcare inspections. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
  {
    name: "multistate-childcare-licensing",
    title: "Multi-State Childcare Licensing",
    actorId: "civicdataforge/multistate-childcare-licensing",
    schema: "multistate-childcare-licensing.json",
    description: "Use for cross-state childcare licensing, inspection, and deficiency research across supported states. For Texas-only operation, inspection, or deficiency filters, use texas-childcare-licensing instead. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
  {
    name: "texas-childcare-licensing",
    title: "Texas Childcare Licensing",
    actorId: "civicdataforge/texas-childcare-licensing",
    schema: "texas-childcare-licensing.json",
    description: "Use for Texas-only childcare operation, inspection, and deficiency evidence. For comparable research spanning multiple supported states, use multistate-childcare-licensing instead. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
  {
    name: "epa-echo-facility-compliance",
    title: "EPA ECHO Facility Compliance Evidence",
    actorId: "civicdataforge/epa-echo-facility-compliance",
    schema: "epa-echo-facility-compliance.json",
    description: "Use for a bounded EPA ECHO facility query that preserves published identity, compliance, inspection, and enforcement evidence while keeping environmental safety UNKNOWN. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
  {
    name: "norway-company-evidence",
    title: "Norway Company & Supplier Evidence",
    actorId: "civicdataforge/norway-company-evidence",
    schema: "norway-company-evidence.json",
    description: "Use for exact nine-digit Norwegian organisation-number evidence or bounded company-name research from Brønnøysundregistrene. NLOD 2.0 permits commercial reuse with attribution and change disclosure, but buyer-specific privacy and lawful-basis review may still be required for personal-data-bearing records; this Actor omits roles, contacts, and street address lines and never issues a KYC, procurement, sanctions, or eligibility verdict. Starts the bound Apify Actor with the caller's APIFY_TOKEN, may consume Apify usage, waits up to 60 seconds, and returns at most 1,000 source-linked rows without modifying government records.",
  },
];

const byName = new Map(TOOL_SPECS.map((tool) => [tool.name, tool]));

function cleanInputSchema(schema) {
  const { schemaVersion: _schemaVersion, title: _title, ...inputSchema } = schema;
  return { type: "object", ...inputSchema };
}

async function loadToolDefinitions() {
  return Promise.all(
    TOOL_SPECS.map(async (tool) => {
      const raw = await readFile(new URL(`./schemas/${tool.schema}`, import.meta.url), "utf8");
      return {
        name: tool.name,
        title: tool.title,
        description: tool.description,
        inputSchema: cleanInputSchema(JSON.parse(raw)),
        annotations: {
          readOnlyHint: false,
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: true,
        },
      };
    }),
  );
}

export const TOOL_DEFINITIONS = await loadToolDefinitions();

function textResult(value, isError = false) {
  return {
    isError,
    content: [{ type: "text", text: JSON.stringify(value, null, 2) }],
  };
}

export async function callActorTool(name, input, {
  token = process.env.APIFY_TOKEN,
  clientFactory = (apiToken) => new ApifyClient({ token: apiToken }),
} = {}) {
  const spec = byName.get(name);
  if (!spec) return textResult({ error: `Unknown tool: ${name}` }, true);
  if (!token || token === "placeholder") {
    return textResult({
      error: "APIFY_TOKEN_REQUIRED",
      message: "Set APIFY_TOKEN to an Apify API token before calling a CivicDataForge tool.",
    }, true);
  }

  try {
    const client = clientFactory(token);
    const run = await client.actor(spec.actorId).call(input ?? {}, { waitSecs: 60 });
    const response = {
      actorId: spec.actorId,
      runId: run.id,
      status: run.status,
      datasetId: run.defaultDatasetId ?? null,
    };

    if (run.status === "SUCCEEDED" && run.defaultDatasetId) {
      const { items } = await client.dataset(run.defaultDatasetId).listItems({ limit: 1000 });
      response.items = items;
      response.itemCount = items.length;
      response.truncated = items.length === 1000;
    } else {
      response.message = "The run did not finish successfully within the bounded wait. Inspect the run in Apify Console.";
    }
    return textResult(response);
  } catch (error) {
    return textResult({
      error: "ACTOR_CALL_FAILED",
      message: error instanceof Error ? error.message : String(error),
      actorId: spec.actorId,
    }, true);
  }
}

export function createServer(options = {}) {
  const server = new Server(
    { name: "civicdataforge", version: "1.4.0" },
    { capabilities: { tools: {} } },
  );
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOL_DEFINITIONS }));
  server.setRequestHandler(CallToolRequestSchema, async (request) =>
    callActorTool(request.params.name, request.params.arguments, options));
  return server;
}

async function main() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
