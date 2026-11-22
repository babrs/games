<script>
	import { base } from '$app/paths';
	import { TabSwitcher } from 'babrs-ui';
	import { CardGrid } from '$lib/components';
	import { HeroBanner } from '$lib/components';;
	import SymbolPreview from './__components/SymbolPreview/index.js';
	import SymbolModal from './__components/SymbolModal/index.js';

	let { data } = $props();
	const game = $derived(data.game);

	let openIndex = $state(null);
</script>

<svelte:head>
	<title>Good Dobble «Байкал» — символы игры | Babrs Games</title>
	<meta name="description" content={game.description} />
	<meta name="keywords" content={game.keywords.join(', ')} />
</svelte:head>

<HeroBanner backgroundImage={game.heroImage} title={game.title} titleImage="{base}/images/dobble/baikal/title-baikal.webp" titleAlt="Байкал">
	<p class="lead">{game.description}</p>
</HeroBanner>

<TabSwitcher
	label="Разделы Добрый Доббль"
	active="symbols"
	items={[
		{ id: 'symbols', href: `${base}/dobble/`, label: 'Символы' },
		{ id: 'rules', href: `${base}/dobble/rules/`, label: 'Правила' }
	]}
/>

<section class="container section" aria-labelledby="symbols-title">
	<h2 class="section__title" id="symbols-title">Символы игры</h2>
	<p class="section__lead">Нажмите на карточку, чтобы открыть описание символа. Стрелками и свайпом можно листать колоду.</p>

	<CardGrid items={game.symbols} label="Символы игры Good Dobble «Байкал»" onopen={(index) => (openIndex = index)}>
		{#snippet item(symbol)}
			<SymbolPreview {symbol} />
		{/snippet}
	</CardGrid>
</section>

{#if openIndex !== null}
	<SymbolModal symbols={game.symbols} index={openIndex} onchange={(next) => (openIndex = next)} onclose={() => (openIndex = null)} />
{/if}

<style>
	.lead {
		max-width: 60ch;
		margin-inline: auto;
		font-size: var(--font-size-lg);
	}

	.section {
		display: grid;
		gap: var(--space-lg);
		padding-block: var(--space-lg) var(--space-xl);
	}
</style>
