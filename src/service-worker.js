/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />
import { build, files, prerendered, version } from '$service-worker';

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));
const CACHE = `babrs-games-${version}`;
const BASE = self.location.pathname.split('/').slice(0, -1).join('/');
const PAGES = ['', '/dobble/', '/dobble/rules/', '/mafia/baikal/', '/mafia/baikal/rules/', '/mafia/baikal/host/'].map(
	(path) => `${BASE}${path || '/'}`
);
const PRECACHE = [...build, ...files, ...prerendered, ...PAGES];

sw.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
	);
});

sw.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET') return;
	if (new URL(request.url).origin !== location.origin) return;
	event.respondWith(respond(request));
});

/**
 * Сначала кэш для ресурсов, сеть с обновлением кэша для страниц.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function respond(request) {
	const cache = await caches.open(CACHE);
	const isPage = request.mode === 'navigate';

	if (!isPage) {
		const cached = await cache.match(request);
		if (cached) return cached;
	}

	try {
		const response = await fetch(request);
		if (response.ok && isPage) cache.put(request, response.clone());
		return response;
	} catch {
		const cached = await cache.match(request, { ignoreSearch: true });
		if (cached) return cached;
		if (isPage) {
			const { pathname } = new URL(request.url);
			const alternative = pathname.endsWith('/') ? pathname.slice(0, -1) : `${pathname}/`;
			const fallback = await cache.match(alternative);
			if (fallback) return fallback;
		}
		return Response.error();
	}
}
