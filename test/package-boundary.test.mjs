import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));

const exactAllowedEntries = new Set([
  'server.mjs',
  'server.json',
  'glama.json',
  'schemas/',
  'README.md',
  'LICENSE',
  'SECURITY.md',
]);

test('npm publication remains an explicit public-bridge allowlist', () => {
  assert.deepEqual(new Set(packageJson.files), exactAllowedEntries);
  assert.equal(packageJson.private, false);
  assert.equal(packageJson.publishConfig?.access, 'public');
});
test('public bridge source contains no core implementation markers or embedded credentials', async () => {
  const publicFiles = ['server.mjs', 'server.json', 'glama.json', 'README.md', 'SECURITY.md'];
  const schemaFiles = (await readdir(path.join(root, 'schemas')))
    .filter((name) => name.endsWith('.json'))
    .map((name) => path.join('schemas', name));

  const forbiddenCoreMarkers = [
    /createRecordSetShapeAccumulator/,
    /buildRecordSetShapeReceipt/,
    /compareShapeReceipts/,
    /CRITICAL_SOURCE_SHAPE_DRIFT/,
    /SOURCE-RECORD-SET-SHAPE/,
    /foundry[\\/]+actors/i,
  ];
  const credentialPatterns = [
    /\bapify_api_[A-Za-z0-9_-]{20,}\b/i,
    /\bsk-[A-Za-z0-9_-]{20,}\b/,
    /(?:api[_-]?key|token|secret)\s*[:=]\s*["'][^"']{16,}["']/i,
  ];

  for (const relative of [...publicFiles, ...schemaFiles]) {
    const text = await readFile(path.join(root, relative), 'utf8');
    for (const pattern of forbiddenCoreMarkers) {
      assert.doesNotMatch(text, pattern, `${relative} exposes a private-core marker`);
    }
    for (const pattern of credentialPatterns) {
      assert.doesNotMatch(text, pattern, `${relative} appears to contain a credential`);
    }
  }
});
