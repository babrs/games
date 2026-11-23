<script>
	import 'babrs-ui/styles';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { AppHeader } from '$lib/components';
	import { AppFooter } from '$lib/components';

	let { children } = $props();

	const brand = 'Бабр Игры';
	const tagline = 'настолки из сибири';

	const path = $derived(page.url.pathname);
	const isHostApp = $derived(path.startsWith(`${base}/mafia/baikal/host/`));
	const navItems = $derived([
		{ href: `${base}/`, label: 'Главная', current: path === `${base}/` },
		{ href: `${base}/dobble/`, label: 'Добрый Доббль', current: path.startsWith(`${base}/dobble`) },
		{ href: `${base}/mafia/baikal/`, label: 'Мафия', current: path.startsWith(`${base}/mafia/baikal`) }
	]);
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.svg" type="image/svg+xml" />
</svelte:head>

{#if !isHostApp}
	<AppHeader {brand} {tagline} homeHref="{base}/" {navItems} />
{/if}

<main>
	{@render children()}
</main>

{#if !isHostApp}
<AppFooter
	title={brand}
	{tagline}
	links={[
		{ href: `${base}/dobble/`, label: 'Добрый Доббль' },
		{ href: `${base}/mafia/baikal/`, label: 'Байкальская мафия' }
	]}
/>
{/if}
