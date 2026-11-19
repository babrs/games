import { base } from '$app/paths';
import dobbleBaikal from '$lib/content/dobbleBaikal/index.js';

export const prerender = true;

export function load() {
	return {
		game: {
			...dobbleBaikal,
			heroImage: `${base}${dobbleBaikal.heroImage}`,
			symbols: dobbleBaikal.symbols.map((symbol) => ({ ...symbol, image: `${base}${symbol.image}` }))
		}
	};
}
