import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

async function json(relative) {
  return JSON.parse(await readFile(new URL(relative, import.meta.url), "utf8"));
}

test("package, server, source, and ten-tool remote metadata remain version-aligned", async () => {
  const [pkg, lock, server, source, schemas] = await Promise.all([
    json("../package.json"),
    json("../package-lock.json"),
    json("../server.json"),
    readFile(new URL("../server.mjs", import.meta.url), "utf8"),
    readdir(new URL("../schemas/", import.meta.url)),
  ]);
  assert.equal(pkg.version, "1.4.1");
  assert.equal(lock.version, pkg.version);
  assert.equal(lock.packages[""].version, pkg.version);
  assert.equal(server.version, pkg.version);
  assert.match(source, /name: "civicdataforge", version: "1\.4\.1"/);
  assert.match(pkg.description, /ten CivicDataForge/);
  assert.match(server.description, /Ten .*evidence tools/);
  assert(server.description.length <= 100, "MCP Registry description must not exceed 100 characters");
  assert.equal(schemas.filter((name) => name.endsWith(".json")).length, 10);

  const remote = new URL(server.remotes[0].url);
  assert.equal(remote.href, "https://civicdataforge.pages.dev/mcp");
  assert.equal(server.remotes[0].headers[0].name, "X-Apify-Token");
  assert.match(server.remotes[0].headers[0].description, /Public initialize and tools\/list discovery do not require it/);
  assert.equal(server.remotes[0].headers[0].isRequired, true);
  assert.equal(server.remotes[0].headers[0].isSecret, true);
});
