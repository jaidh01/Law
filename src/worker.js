import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    // Try to serve the requested asset
    return await getAssetFromKV(event);
  } catch (e) {
    // If the requested asset is not found, serve the main HTML for SPA routing
    const url = new URL(event.request.url);
    
    // Check if this is an API request or a request for a specific file extension
    const isApiRequest = url.pathname.startsWith('/api/');
    const hasFileExtension = /\.[a-z0-9]+$/i.test(url.pathname);
    
    // For API requests and file requests that failed, return a 404
    if (isApiRequest || hasFileExtension) {
      return new Response('Not Found', { status: 404 });
    }
    
    // For everything else, serve the main HTML file for SPA routing
    try {
      return await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req)
      });
    } catch (e) {
      return new Response('Server Error', { status: 500 });
    }
  }
}