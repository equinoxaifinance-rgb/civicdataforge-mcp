import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

test("real stdio initialize, tools/list, and credential failure path", async () => {
  const serverPath = fileURLToPath(new URL("../server.mjs", import.meta.url));
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [serverPath],
    env: { ...process.env, APIFY_TOKEN: "placeholder" },
  });
  const client = new Client({ name: "civicdataforge-release-test", version: "1.0.0" });
  try {
    await client.connect(transport);
    const listed = await client.listTools();
    assert.equal(listed.tools.length, 7);
    const called = await client.callTool({
      name: "str-permit-registry",
      arguments: { jurisdiction: "orlando" },
    });
    assert.equal(called.isError, true);
    assert.match(called.content[0].text, /APIFY_TOKEN_REQUIRED/);
  } finally {
    await client.close();
  }
});
