# CivicDataForge MCP Gateway 1.1.0 — Release Verification

Verified on 2026-08-22 for the strengthened 1.1.0 release branch.

## Shipped artifact

- File: `civicdataforge-mcp-gateway-1.1.0.tgz`
- SHA-256: `B32D89B02BE27659A485CBE9FB19090327570D1C8E91B6A3050C84192F01B342`
- npm contents: 13 intended files, 10.2 kB packed, 34.8 kB unpacked
- The packed `package.json`, server, metadata, README, license, and all seven schemas are byte-identical to the release source.
- Strong credential scan found no tokens, cloud keys, GitHub tokens, or private keys. The broader assignment scan found only the documented `YOUR_APIFY_TOKEN` placeholder, `process.env.APIFY_TOKEN`, and the client-factory parameter.

## Runtime receipts

- Fresh source install: 152 packages audited, zero vulnerabilities.
- Source suite: 4 passed, 0 failed.
- Fresh install of the exact tarball outside the source tree: initialized successfully, returned exactly seven tools, and returned `APIFY_TOKEN_REQUIRED` for a credential-free call.
- Installed npm binary (`node_modules/.bin/civicdataforge-mcp.cmd`): initialized successfully, returned exactly seven tools, and preserved the credential boundary.
- Mocked authenticated dispatch: called the bound Actor and returned a dataset row through the normal response path.
- Official MCP `server.json` schema: valid against `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`.
- Official `mcp-publisher` v1.7.9 validation: `server.json is valid` against `https://registry.modelcontextprotocol.io`; the Windows publisher binary matched release SHA-256 `aa7c3e014a38b427171b5c6d2c034551daa6fd822ce4a00d1dee2dbf7a21c118`.
- Glama metadata: valid against `https://glama.ai/mcp/schemas/server.json`.

## Reproducible Glama container

- Maintainer-authored `Dockerfile` builds successfully from the repository.
- Image: `civicdataforge-mcp:1.1.0`
- Image ID: `sha256:5d245ef0af4f9c4d81033799c0e6a27f407fc11d3ab37a2302983a7da2faac82`
- Runtime user: `node` (`uid=1000`), working directory `/app`, command `node server.mjs`.
- Network-disabled container test: initialized successfully, returned exactly seven tools, and returned `APIFY_TOKEN_REQUIRED` without attempting an external call.
- The image contains only the two declared production dependencies and no self-reference.

Glama's current indexing methodology says discoverability depends on a reproducible container build and protocol introspection. The checked-in Dockerfile removes the prior inferred-build dependency: <https://glama.ai/mcp/methodology>.

## Publication boundaries

- npm publication is not complete: the package name returned HTTP 404 and this machine has no authenticated npm session.
- The official MCP Registry already reports `io.github.equinoxaifinance-rgb/civicdataforge` version 1.1.0 as active and latest; GitHub Actions run `32470428723` completed successfully for default-branch commit `9e44a5d`.
- The stronger Docker, npm-bin, and tool-definition layers are not on the GitHub default branch until the verified branch is pushed, fast-forwarded, and read back.
- Glama quality rescoring is not complete until the published repository revision is built and introspected by Glama.
- A real package-to-Apify call was not made because this shell has no caller-provided `APIFY_TOKEN`; the authenticated dispatch path is covered by the mocked Actor test, while the exact packaged and containerized credential-failure paths were executed directly.
