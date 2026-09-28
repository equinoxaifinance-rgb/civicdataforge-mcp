# Check one property request in n8n before paying

Import [civicdataforge-free-quote.workflow.json](civicdataforge-free-quote.workflow.json) into an isolated n8n workspace. It makes one no-charge request to CivicDataForge's quote endpoint, checks the response, and stops with a separate purchase-route link. No API key is needed for this check.

**A ready quote is input validation, not government evidence, address coverage, a permit finding, clearance or payment.** The workflow does not run an Actor, collect records or include the private data engine.

## Use the workflow

1. In an existing authorized n8n editor, create an empty workflow and choose **Import from File**. Select the JSON above. Use an isolated workspace: its stable workflow ID must not overwrite an unrelated workflow.
2. Read the sticky note and open **Choose input**. Replace the public example address, city and state with concrete public values. Do not put keys or private information in the fields. The Orlando example is not a claim that the address has an STR permit.
3. Leave the workflow unpublished and use **Execute workflow** manually.
4. Inspect the final node's JSON, not only n8n's green execution indicator. `scope_ready_not_evidence` means the free quote was accepted; `paymentAttempted` and `evidenceRetrieved` remain false.
5. If you want an evidence packet, open the returned [Apify product route](https://apify.com/civicdataforge/civicdataforge-evidence-gateway), review its current input, price and terms, and authorize that separate purchase explicitly. This workflow never initiates it.

The [connection guide](https://civicdataforge.pages.dev/connect-agent) describes other purchase and integration options. The [cURL walkthrough](../first-request.md) offers the same input-check boundary without n8n. Current examples are available from [the no-charge quote contract](https://civicdataforge.pages.dev/api/quote).

## What the result means

| Result | Next action |
|---|---|
| `scope_ready_not_evidence` | Read the quote ID, expiry, submitted scope and separate handoff. A record still has not been retrieved. |
| `rejected` with missing/invalid input | Correct the concrete address and jurisdiction; rerun the whole workflow. Unresolved mapping strings are not addresses. |
| Expired, future-dated or incompatible response | Obtain a fresh valid quote. Do not proceed with an earlier result for different input. |
| HTTP 429, 5xx or transport failure | Inspect the error and service state, then decide whether to retry manually. There is no automatic retry or purchase loop. |

The submitted scope is bound locally. The quote response does not independently echo/verify the address, so this wrapper does not claim address verification. Quotes are short-lived and nonbinding; the live purchase route controls final price and fulfillment. After any input change or expiry, rerun rather than reusing the old quote.

## Safety and verification

Only a manual trigger, grouped input, one fixed free HTTP destination, response mapping and an explanatory note are included. There are no credentials, schedules, webhooks, paid nodes or automatic retries. Failed checks return no purchase handoff. Instance-level execution retention may override workflow settings; inspect it before handling sensitive information.

The wrapper was imported/exported with matching graph bytes in n8n 2.40.7 on Node 24.19.0. Native CLI success reached `scope_ready_not_evidence`; the invalid mapping case reached `rejected/UNRESOLVED_TEMPLATE_INPUT`. Packaged-code tests cover transport, malformed responses, expiry, wrong task, unexpected charge and malicious purchase-link substitution. These checks establish the bounded client behavior, not paid fulfillment.

Editor-canvas inspection remains uncompleted: a clean local instance opened its owner setup form, and no credentials were created. This is not an n8n-certified or template-directory-listed integration. The written editor import steps remain to be visually verified after owner setup. No campaign/source tag is sent; do not label use as an attributed n8n referral without separate evidence.

For local operators, use a private new `N8N_USER_FOLDER` and bind both editor and task-runner broker to `127.0.0.1`. Use unused local ports, no public tunnel, and the official [n8n setup guide](https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm). The [server CLI](https://docs.n8n.io/deploy/host-n8n/configure-n8n/use-the-command-line) supports `import:workflow`, `export:workflow` and manual `execute --id=<ID>`. Keep private database/export/log files out of anything you share. A fresh editor requires owner setup; do not bypass it. Node 25 and n8n 3 are not the tested baseline.

## License and scope

This original client workflow and guide are [MIT licensed](LICENSE). You may copy, modify and redistribute this bounded wrapper under that license. The grant does not include the hosted API, private collection/normalization engine, paid evidence fulfillment, government-source data rights, n8n itself, credentials or service access. Those retain their own terms. The free check does not provide a route around paid delivery.

Workflow SHA-256: `843e293af3e7aab219c36696d02db1211ce615d96e9d8e3bd13e922c40c5eeda`.
