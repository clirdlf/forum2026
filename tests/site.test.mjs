import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('build outputs a homepage with core forum messaging', async () => {
  const html = await readFile(new URL('../_site/index.html', import.meta.url), 'utf8');

  assert.match(html, /<title>\s*Welcome\s*-\s*<\/title>/i);
  assert.match(html, /FORUM 2026/i);
  assert.match(
    html,
    /A fully virtual experience connecting digital practitioners from around the globe\./i,
  );
  assert.match(html, /Why Virtual\?/i);
});
