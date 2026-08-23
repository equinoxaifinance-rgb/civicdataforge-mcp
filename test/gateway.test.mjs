import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { TOOL_DEFINITIONS, callActorTool } from "../server.mjs";

test("publishes exactly the ten CivicDataForge tools with bounded schemas", () => {
  assert.equal(TOOL_DEFINITIONS.length, 10);
  assert.deepEqual(
    TOOL_DEFINITIONS.map((tool) => tool.name),
    [
      "civicdataforge-evidence-gateway",
      "str-permit-registry",
      "fl-dbpr-vacation-rentals",
      "property-violations",
      "leie-exclusion-screening",
      "restaurant-inspection-scores",
      "multistate-childcare-licensing",
      "texas-childcare-licensing",
      "epa-echo-facility-compliance",
      "norway-company-evidence",
    ],
  );
  for (const tool of TOOL_DEFINITIONS) {
    assert.equal(tool.inputSchema.type, "object");
    assert.ok(Object.keys(tool.inputSchema.properties ?? {}).length > 0);
    assert.ok(tool.title && tool.title !== tool.name, `${tool.name} keeps a human-readable title`);
    assert.ok(tool.description.length >= 100, `${tool.name} keeps a task-routing description`);
    assert.match(tool.description, /^Use /);
    assert.match(tool.description, /APIFY_TOKEN/);
    assert.match(tool.description, /consume Apify usage/);
    assert.match(tool.description, /60 seconds/);
    assert.match(tool.description, /1,000 source-linked rows/);
    assert.equal(tool.annotations.readOnlyHint, false);
    assert.equal(tool.annotations.destructiveHint, false);
    assert.equal(tool.annotations.idempotentHint, false);
    assert.equal(tool.annotations.openWorldHint, true);
  }
});

test("ships the Actor's exact Norway input schema and fail-closed rights description", async () => {
  const schemaBytes = await readFile(new URL("../schemas/norway-company-evidence.json", import.meta.url));
  assert.equal(createHash("sha256").update(schemaBytes).digest("hex"), "589bdbe3a9c1d9df6696b1bf6df75519366fbac08b77ff4911451a097bb268ef");
  const norway = TOOL_DEFINITIONS.find((tool) => tool.name === "norway-company-evidence");
  assert(norway);
  assert.equal(norway.inputSchema.properties.queries.minItems, 1);
  assert.equal(norway.inputSchema.properties.queries.maxItems, 25);
  assert.deepEqual(norway.inputSchema.properties.queries.items.properties.purpose.enum, ["ENTITY_VERIFICATION", "SUPPLIER_ONBOARDING_EVIDENCE", "PROCUREMENT_RESEARCH", "OTHER"]);
  assert.equal(norway.inputSchema.properties.maxRecords.maximum, 50);
  assert.match(norway.description, /NLOD 2\.0 permits commercial reuse/);
  assert.match(norway.description, /privacy and lawful-basis review may still be required/);
  assert.match(norway.description, /omits roles, contacts, and street address lines/);
});

test("refuses calls without a real caller-supplied token while retaining tool discovery", async () => {
  const result = await callActorTool("str-permit-registry", {}, { token: "placeholder" });
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /APIFY_TOKEN_REQUIRED/);
});

test("dispatches to the bound Actor and returns dataset rows", async () => {
  let calledActor;
  let calledInput;
  const mockClient = {
    actor(actorId) {
      calledActor = actorId;
      return {
        async call(input) {
          calledInput = input;
          return { id: "run-1", status: "SUCCEEDED", defaultDatasetId: "dataset-1" };
        },
      };
    },
    dataset(datasetId) {
      assert.equal(datasetId, "dataset-1");
      return { async listItems() { return { items: [{ permitId: "P-1" }] }; } };
    },
  };

  const result = await callActorTool("str-permit-registry", { city: "Orlando" }, {
    token: "test-token",
    clientFactory: () => mockClient,
  });
  assert.equal(result.isError, false);
  assert.equal(calledActor, "civicdataforge/str-permit-registry");
  assert.deepEqual(calledInput, { city: "Orlando" });
  assert.match(result.content[0].text, /"itemCount": 1/);
});

test("routes the Norway input unchanged to its direct Actor and returns explicit evidence rows", async () => {
  const input = {
    queries: [{ reference: "supplier-no-001", organisationNumber: "974760673", purpose: "SUPPLIER_ONBOARDING_EVIDENCE" }],
    maxRecords: 10,
    batchReference: "batch-no-001",
  };
  let actorId;
  let calledInput;
  const mockClient = {
    actor(id) {
      actorId = id;
      return { async call(value, options) {
        calledInput = value;
        assert.deepEqual(options, { waitSecs: 60 });
        return { id: "run-no-1", status: "SUCCEEDED", defaultDatasetId: "dataset-no-1" };
      } };
    },
    dataset(id) {
      assert.equal(id, "dataset-no-1");
      return { async listItems(options) {
        assert.deepEqual(options, { limit: 1000 });
        return { items: [{ decision: "MATCH", organisation_number: "974760673", procurement_verdict: false }] };
      } };
    },
  };
  const result = await callActorTool("norway-company-evidence", input, { token: "test-token", clientFactory: () => mockClient });
  assert.equal(result.isError, false);
  assert.equal(actorId, "civicdataforge/norway-company-evidence");
  assert.deepEqual(calledInput, input);
  assert.match(result.content[0].text, /"decision": "MATCH"/);
  assert.match(result.content[0].text, /"procurement_verdict": false/);
});

test("Norway negative paths fail closed before or at the Actor boundary", async () => {
  let clientCreated = false;
  const noToken = await callActorTool("norway-company-evidence", { queries: [] }, {
    token: "placeholder",
    clientFactory: () => { clientCreated = true; throw new Error("must not run"); },
  });
  assert.equal(noToken.isError, true);
  assert.equal(clientCreated, false);
  assert.match(noToken.content[0].text, /APIFY_TOKEN_REQUIRED/);

  const unknown = await callActorTool("norway-company-evidence-typo", {}, { token: "test-token" });
  assert.equal(unknown.isError, true);
  assert.match(unknown.content[0].text, /Unknown tool/);

  const deniedClient = { actor() { return { async call() { throw new Error("Actor not found or caller lacks access"); } }; } };
  const denied = await callActorTool("norway-company-evidence", { queries: [] }, { token: "test-token", clientFactory: () => deniedClient });
  assert.equal(denied.isError, true);
  assert.match(denied.content[0].text, /ACTOR_CALL_FAILED/);
  assert.match(denied.content[0].text, /civicdataforge\/norway-company-evidence/);

  const unfinishedClient = { actor() { return { async call() { return { id: "run-no-timeout", status: "RUNNING", defaultDatasetId: null }; } }; } };
  const unfinished = await callActorTool("norway-company-evidence", { queries: [] }, { token: "test-token", clientFactory: () => unfinishedClient });
  assert.equal(unfinished.isError, false);
  assert.match(unfinished.content[0].text, /did not finish successfully within the bounded wait/);
});
