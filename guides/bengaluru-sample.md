# Inspect Bengaluru municipal-asset data before choosing API access

Begin with the existing [three-record sample](https://civicdataforge.pages.dev/downloads/india-bengaluru-sample.json). It is a bounded way to inspect fields and provenance, not a complete free dataset or a promise of live nationwide property coverage.

```js
const response = await fetch('https://civicdataforge.pages.dev/downloads/india-bengaluru-sample.json');
if (!response.ok) throw new Error(`Sample HTTP ${response.status}`);
console.log(JSON.stringify(await response.json(), null, 2));
```

## Read geography and time literally

The offer concerns GBA Bengaluru municipal assets. It is not a title search, ownership warranty, market valuation or a list of every residence in Bengaluru. Retain source dates and coordinate-quality fields. An approximate source coordinate does not become a surveyed point merely because software matched it to a ward polygon.

## Evaluate the current offer

Inspect [machine-readable availability](https://civicdataforge.pages.dev/api/india-starter) and the [buyer page](https://civicdataforge.pages.dev/india-evidence.html) before proceeding. The introductory experiment is US$9 plus applicable tax for 30 days, 500 successful requests, at most 100 requests per day and 100 records per request. There is no automatic renewal. Availability is bounded by the five-purchase experiment and its September 12, 2026 cutoff; do not assume it remains purchasable after the live offer closes.

The underlying official records are publicly available. The paid proposition is the documented API access and delivery workflow, not exclusive ownership of government facts. Read the current source and refund disclosures before purchase.

## Keep access recovery private

Save the private access pass before checkout. After a supported completed purchase it can recover the same key during the term. Never paste the pass or API key into a public issue or an email. If both are lost, purchase verification is required; do not expect anonymous reconstruction.

If these fields do not fit your workflow, send a non-sensitive schema or coverage question to civicdataforgehq@gmail.com. A useful evaluation may conclude that the source is the wrong dataset. No owner test, sample download or anonymous page view is a paying customer.
