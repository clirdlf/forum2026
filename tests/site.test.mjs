import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readBuiltPage(pathname) {
  return readFile(new URL(`../_site/${pathname}`, import.meta.url), 'utf8');
}

// test('build outputs a homepage with core forum messaging', async () => {
//   const html = await readBuiltPage('index.html');

//   assert.match(html, /<title>\s*Welcome\s*-\s*DLF Forum 2026\s*<\/title>/i);
//   assert.match(html, /DLF Virtual Forum/i);
//   assert.match(
//     html,
//     /A digital gathering place for GLAM professionals to share, sustain, and innovate\./i
//   );
//   assert.match(html, /The DLF Forum/i);
// });

test('built pages include a skip link and focusable main landmark', async () => {
  const [homeHtml, cfpHtml] = await Promise.all([
    readBuiltPage('index.html'),
    readBuiltPage('call-for-proposals/index.html'),
  ]);

  for (const html of [homeHtml, cfpHtml]) {
    assert.match(html, /<a class="skip-link" href="#main-content">Skip to main content<\/a>/i);
    assert.match(html, /<main id="main-content" tabindex="-1">/i);
  }
});

test('primary navigation exposes current page state to assistive tech', async () => {
  const [homeHtml, cfpHtml] = await Promise.all([
    readBuiltPage('index.html'),
    readBuiltPage('call-for-proposals/index.html'),
  ]);

  assert.match(homeHtml, /<a[^>]*href="\/"[^>]*aria-current="page"[^>]*>Home<\/a>/i);
  assert.match(
    cfpHtml,
    /<a[^>]*href="\/call-for-proposals\/"[^>]*aria-current="page"[^>]*>Call for Proposals<\/a>/i
  );
});

test('proposal CTA is never rendered as a dead button in built pages', async () => {
  const [homeHtml, cfpHtml] = await Promise.all([
    readBuiltPage('index.html'),
    readBuiltPage('call-for-proposals/index.html'),
  ]);

  for (const html of [homeHtml, cfpHtml]) {
    assert.doesNotMatch(html, /<button[^>]*>\s*Submit(?: Your)? Proposal/i);
    assert.match(html, /Proposal Portal Coming Soon|href="https?:\/\/[^"]+"/i);
  }
});

test('decorative material symbol icons are hidden from assistive tech', async () => {
  const [homeHtml, cfpHtml] = await Promise.all([
    readBuiltPage('index.html'),
    readBuiltPage('call-for-proposals/index.html'),
  ]);

  const iconPattern = /<span class="material-symbols-outlined[^"]*"[^>]*>[^<]+<\/span>/gi;

  for (const html of [homeHtml, cfpHtml]) {
    const icons = html.match(iconPattern) ?? [];

    assert.ok(icons.length > 0, 'expected at least one material symbol icon in built HTML');

    for (const icon of icons) {
      assert.match(icon, /aria-hidden="true"/i);
    }
  }
});
