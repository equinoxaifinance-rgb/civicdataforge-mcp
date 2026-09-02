# CivicDataForge operational ledgers

These append-only ledgers separate observed platform facts from attribution and inference.

- `daily-usage-ledger.jsonl` records Apify run, user, cost, and acquisition receipts.
- `conversion-72h-ledger.jsonl` records the measured conversion funnel and comparison window.
- `receipts/` preserves the full timestamped evidence snapshot used by both ledgers.

All monetary values are USD unless another currency is stated. Rounded UI costs are labeled as such. Page-view geography is never treated as run or customer geography.
