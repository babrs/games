import { base } from '$app/paths';
import mafiaBaikalRules from '$lib/content/mafiaBaikalRules/index.js';

export const prerender = true;

export function load() {
	return {
		rules: mafiaBaikalRules,
		image: `${base}/images/mafia/baikal/back.webp`
	};
}
