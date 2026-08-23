import assert from "node:assert/strict";
import test from "node:test";
import { TOOL_DEFINITIONS, callActorTool } from "../server.mjs";

test("publishes exactly the nine CivicDataForge tools with bounded schemas", () => {
  assert.equal(TOOL_DEFINITIONS.length, 9);
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
