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
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|react-loading-skeleton/);
});

test("starter preview files were removed", async () => {
  await assert.rejects(readdir(previewRoot));
});
