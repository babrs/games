<script>
	import 'babrs-ui/styles';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import AppHeader from '$lib/components/AppHeader/index.js';
	import AppFooter from '$lib/components/AppFooter/index.js';

	let { children } = $props();

	const path = $derived(page.url.pathname);
	const navItems = $derived([
		{ href: `${base}/`, label: 'Игры', current: path === `${base}/` },
		{ href: `${base}/dobble/`, label: 'Good Dobble', current: path.startsWith(`${base}/dobble`) },
		{ href: `${base}/mafia/baikal/`, label: 'Мафия', current: path.startsWith(`${base}/mafia/baikal`) && !path.includes('/host') },
		{ href: `${base}/mafia/baikal/host/`, label: 'Ведущий', current: path.includes('/mafia/baikal/host') }
	]);
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.svg" type="image/svg+xml" />
</svelte:head>

<AppHeader brand="Babrs Games" logoSrc="{base}/assets/logo/logo.svg" tagline="игры для семьи" homeHref="{base}/" {navItems} />

<main>
	{@render children()}
</main>

<AppFooter
	title="Babrs Games"
	tagline="Настольные игры с понятными правилами"
	links={[
		{ href: `${base}/dobble/`, label: 'Good Dobble' },
		{ href: `${base}/mafia/baikal/`, label: 'Байкальская мафия' },
		{ href: 'https://github.com/Babrs', label: 'GitHub Babrs', external: true }
	]}
	note="Сайт собран на SvelteKit и Babrs UI"
/>
