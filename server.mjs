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
    name: "str-permit-registry",
    actorId: "civicdataforge/str-permit-registry",
    schema: "str-permit-registry.json",
    description: "Query source-linked short-term-rental permit and license records across supported US jurisdictions.",
  },
  {
    name: "fl-dbpr-vacation-rentals",
    actorId: "civicdataforge/fl-dbpr-vacation-rentals",
    schema: "fl-dbpr-vacation-rentals.json",
    description: "Query Florida DBPR vacation-rental license evidence.",
  },
  {
    name: "property-violations",
    actorId: "civicdataforge/property-violations",
    schema: "property-violations.json",
    description: "Query normalized municipal property and code-violation evidence.",
  },
  {
    name: "leie-exclusion-screening",
    actorId: "civicdataforge/leie-exclusion-screening",
    schema: "leie-exclusion-screening.json",
    description: "Screen review candidates against HHS-OIG LEIE with valid-NPI and source-evidence boundaries.",
  },
  {
    name: "restaurant-inspection-scores",
    actorId: "civicdataforge/restaurant-inspection-scores",
    schema: "restaurant-inspection-scores.json",
    description: "Query official restaurant inspection and violation records across supported jurisdictions.",
  },
  {
    name: "multistate-childcare-licensing",
    actorId: "civicdataforge/multistate-childcare-licensing",
    schema: "multistate-childcare-licensing.json",
    description: "Query childcare licensing and compliance records across supported states.",
  },
  {
    name: "texas-childcare-licensing",
    actorId: "civicdataforge/texas-childcare-licensing",
    schema: "texas-childcare-licensing.json",
    description: "Query Texas childcare operation, inspection, and deficiency evidence.",
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
        title: tool.name,
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
    { name: "civicdataforge", version: "1.1.0" },
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
