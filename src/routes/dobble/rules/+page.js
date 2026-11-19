import { base } from '$app/paths';
import dobbleBaikalRules from '$lib/content/dobbleBaikalRules/index.js';

export const prerender = true;

export function load() {
	return {
		rules: {
			...dobbleBaikalRules,
			heroImage: `${base}${dobbleBaikalRules.heroImage}`
		}
	};
}
