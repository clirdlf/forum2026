import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('build outputs a homepage with core forum messaging', async () => {
  const html = await readFile(new URL('../_site/index.html', import.meta.url), 'utf8');

  assert.match(html, /<title>\s*Welcome\s*-\s*DLF Forum 2026\s*<\/title>/i);
  assert.match(html, /DLF Virtual Forum/i);
  assert.match(
    html,
    /A digital gathering place for GLAM professionals to share, sustain, and innovate\./i
  );
  assert.match(html, /The DLF Forum/i);
});
