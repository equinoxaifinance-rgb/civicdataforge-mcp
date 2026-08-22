import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readmePath = fileURLToPath(new URL("../README.md", import.meta.url));

test("publishes an honest bilingual ModelScope discovery path", async () => {
  const readme = await readFile(readmePath, "utf8");
  assert.match(readme, /## 简体中文：接入与使用边界/);
  assert.match(readme, /政府公开记录/);
  assert.match(readme, /civicdataforge-mcp-gateway@latest/);
  assert.match(readme, /APIFY_TOKEN/);
  assert.match(readme, /在 npm 注册表返回已发布版本之前/);
  assert.match(readme, /不得作为信贷、保险、就业、住房或其他资格决定的唯一依据/);
  assert.equal(
    (readme.match(/civicdataforge\/str-permit-registry/g) ?? []).length >= 2,
    true,
  );
});
