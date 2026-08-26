# CivicDataForge security and disclosure boundary

## What this repository contains

This package is an intentionally small integration bridge. It contains MCP discovery metadata,
input schemas, and a dispatcher that sends an authenticated caller's request to hosted
CivicDataForge services. The MIT license applies only to the files shipped in this repository and
package.

It does **not** include CivicDataForge's source acquisition adapters, reconciliation pipelines,
field-presence and drift monitors, source-rights controls, evidence graph implementation, partner
connectors, operational ledgers, or deployment configuration. Those components are separately
maintained and are not licensed by this repository's MIT license.

## Credential handling

- Supply tokens only through environment variables or supported secret-header configuration.
- Never commit tokens, paste them into URLs, or put them in public examples.
- The bridge does not intentionally log or persist caller tokens.
- Rotate a token immediately if it may have been exposed.

## Vulnerability reports

Report a suspected credential leak, authorization problem, unintended source disclosure, or output
integrity flaw privately to `civicdataforgehq@gmail.com`. Include the affected tool, request shape,
time observed, and reproduction steps. Do not include live credentials or unnecessary personal data.

## Responsible evaluation

Partners can request a controlled evaluation packet containing schemas, sample inputs and outputs,
receipt hashes, source coverage, and a bounded live comparison. Evaluation access does not require
or imply disclosure of the private implementation.
