import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readmePath = fileURLToPath(new URL("../README.md", import.meta.url));

test("publishes a working, credential-safe bilingual ModelScope discovery path", async () => {
  const readme = await readFile(readmePath, "utf8");
  assert.match(readme, /## 简体中文：接入与使用边界/);
  assert.match(readme, /政府公开记录/);
  assert.match(readme, /github:equinoxaifinance-rgb\/civicdataforge-mcp/);
  assert.match(readme, /APIFY_TOKEN/);
  assert.match(readme, /该 GitHub 安装方式和上方 Apify 托管网关均为当前可用路径/);
  assert.doesNotMatch(readme, /civicdataforge-mcp-gateway@latest/);
  assert.match(readme, /不得作为信贷、保险、就业、住房或其他资格决定的唯一依据/);
  assert.match(readme, /norway-company-evidence/);
  assert.match(readme, /NLOD permits commercial/);
  assert.match(readme, /buyer-specific privacy and legal-basis review/);
  assert.match(readme, /public Actor `L9veafufAtLFNgiWP`/);
  assert.match(readme, /build `mnKblLCjPc0BdqrME`, version `0\.1\.3`/);
  assert.match(readme, /owned canary run `6xyIIolQYf3d1u0KR`/);
  assert.match(readme, /deployment verification, not external customer usage/);
  assert.match(readme, /logged-out API routes returned HTTP 403/);
  assert.equal(
    (readme.match(/civicdataforge\/str-permit-registry/g) ?? []).length >= 2,
    true,
  );
});
