import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

test("exports the Thashy Gift Hub storefront for GitHub Pages", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, /<title>Thashy Gift Hub \| Tell Us Your Budget, We Create the Gift<\/title>/i);
  assert.match(html, /Find the Perfect Gift/);
  assert.match(html, /Tell Us Your Budget, We Create the Gift/);
  assert.match(html, /Shop by Category/);
  assert.match(html, /Build Your Own Gift Box/);
  assert.match(html, /Not Sure What to Buy/);
  assert.match(html, /Saved gift ideas/);
  assert.match(html, /Your shopping cart/);
  assert.match(html, /Checkout/);
  assert.match(html, /Order Tracking/);
  assert.match(html, /Customer Reviews/);
  assert.match(html, /\/Gift-Hub\/_next\/static\//);
  assert.doesNotMatch(html, /(?:src|href)=["']\/_next\//);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|react-loading-skeleton/);
});

test("emits GitHub Pages assets at the deployment root", async () => {
  const cssFiles = await readdir(
    new URL("../dist/client/_next/static/css/", import.meta.url),
  );

  assert.ok(cssFiles.some((file) => file.endsWith(".css")));
  await assert.rejects(
    readdir(new URL("../dist/client/Gift-Hub/", import.meta.url)),
  );
});

test("starter preview files were removed", async () => {
  await assert.rejects(readdir(previewRoot));
});
