# CivicDataForge MCP Gateway 1.1.0 — Release Verification

Verified on 2026-08-22 against the public default branch, the release branch,
the exact npm archive, and Glama's customer-visible release.

## Shipped artifact

- File: `civicdataforge-mcp-gateway-1.1.0.tgz`
- SHA-256: `AB9A00BA6210EDDBDD577ADCF631F48427AED5AE77F062EE1B57F54224EB7A12`
- npm shasum: `f56ce3b168e8638f8695f927b78db0e5dda0635a`
- npm integrity: `sha512-XzLFqcZ2jQGZF4moxj3fCIMvBllqOq1sCD3WKYpzg3aP/v9R/ryDJdCioSs+1Mhhn5Q1DzNqebEGnFkaZO4A4A==`
- Contents: 13 intended files, 11,619 bytes packed, 36,985 bytes unpacked.
- The archive contains the package manifest, executable server, discovery metadata, bilingual README, MIT license, and all seven schemas.
- Strong credential scanning found no token, cloud key, GitHub token, or private key. Matches were limited to documented placeholders and the expected environment-variable boundary.

## Runtime receipts

- Source suite: 5 passed, 0 failed, including a bilingual discovery/readiness contract.
- Clean install of the exact archive: initialized successfully and returned exactly seven tools.
- Credential-free call: returned the expected `APIFY_TOKEN_REQUIRED` refusal.
- Installed command shim: present.
- Mocked authenticated dispatch: called the bound Actor and returned a dataset row through the normal response path.
- Official MCP `server.json`: accepted by `mcp-publisher` v1.7.9; the public registry reports `io.github.equinoxaifinance-rgb/civicdataforge` 1.1.0 active/latest.
- Glama metadata: valid against Glama's server schema.

## Public readbacks

- GitHub `main` and `codex/mcp-gateway-1.1.0` resolved to the same reviewed release commit before this receipt-only correction.
- The raw public README matched the reviewed local README after line-ending normalization at SHA-256 `0B1C67737BBF99D83A428C61C0323919435BB63DF0E333D211938A9F1E4EFE9F`.
- Glama published release 1.1.1/latest from the repository, exposed all seven schemas, verified the author and MIT license, and graded Server Coherence, Tool Definition Quality, and Maintenance as A. Its seven tool definitions average 4.6/5.
- The Simplified Chinese section exposes the working hosted endpoint, the future npm/ModelScope configuration, all seven tool purposes, caller-owned token requirements, the npm prepublication boundary, and the same responsible-use limits as English.

## Reproducible Glama container

- Maintainer-authored `Dockerfile` builds from the repository.
- Image: `civicdataforge-mcp:1.1.0`
- Image ID: `sha256:5d245ef0af4f9c4d81033799c0e6a27f407fc11d3ab37a2302983a7da2faac82`
- Runtime user: `node` (`uid=1000`), working directory `/app`, command `node server.mjs`.
- A network-disabled container initialized, returned seven tools, and preserved the `APIFY_TOKEN_REQUIRED` boundary without attempting an external call.

## Publication boundaries

- npm publication is not complete: the package name returns HTTP 404 and no authenticated npm owner session is available on this machine.
- ModelScope publication is not complete and must not advertise the `npx` package path until npm publication and clean registry readback exist.
- The awesome-mcp-servers pull request is open and its Glama requirement is now present, but merge remains an external maintainer decision.
- Glama's public UI is current; its separate directory API was stale at the last direct API readback.
- A real package-to-Apify call still requires the caller's own `APIFY_TOKEN`; no publisher credential is embedded in the source or archive.
