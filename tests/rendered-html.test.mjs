import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Thashy Gift Hub storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, /<title>Thashy Gift Hub \| Tell Us Your Budget, We Create the Gift<\/title>/i);
  assert.match(html, /Make Every Moment Special with Thashy Gift Hub/);
  assert.match(html, /Tell Us Your Budget, We Create the Gift/);
  assert.match(html, /Popular Gift Packs/);
  assert.match(html, /Cute Little Things/);
  assert.match(html, /Create My Gift/);
  assert.match(html, /Shopping Cart/);
  assert.match(html, /Checkout/);
  assert.match(html, /Follow Our Little Gift Moments/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|react-loading-skeleton/);
});

test("starter preview files were removed", async () => {
  await assert.rejects(readdir(previewRoot));
});
