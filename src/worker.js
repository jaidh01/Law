import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    // Try to get the asset from KV
    return await getAssetFromKV(event);
  } catch (e) {
    // If the asset isn't in KV, serve the index page for SPA routing
    return getAssetFromKV(event, {
      mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/index.html`, req),
    });
  }
}