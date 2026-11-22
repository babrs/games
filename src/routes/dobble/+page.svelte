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
	<title>Добрый Доббль «Байкал» — символы игры | Babr Games</title>
	<meta name="description" content={game.description} />
	<meta name="keywords" content={game.keywords.join(', ')} />
</svelte:head>

<HeroBanner backgroundImage={game.heroImage} title="Добрый Доббль" titleImage="{base}/images/dobble/baikal/title-baikal.webp" titleAlt="Добрый Доббль Байкал">
	<nav class="hero-menu" aria-label="Разделы Доброго Доббля">
		<a class="hero-menu__item hero-menu__item_active" href="{base}/dobble/">Символы</a>
		<a class="hero-menu__item" href="{base}/dobble/rules/">Правила</a>
	</nav>
</HeroBanner>

<section class="container section" aria-labelledby="symbols-title">
	<h2 class="section__title" id="symbols-title">Символы игры</h2>
	<p class="section__lead">Нажмите на карточку, чтобы открыть описание символа. Стрелками и свайпом можно листать колоду.</p>

	<CardGrid items={game.symbols} label="Символы игры Добрый Доббль «Байкал»" onopen={(index) => (openIndex = index)}>
		{#snippet item(symbol)}
			<SymbolPreview {symbol} />
		{/snippet}
	</CardGrid>
</section>

{#if openIndex !== null}
	<SymbolModal symbols={game.symbols} index={openIndex} onchange={(next) => (openIndex = next)} onclose={() => (openIndex = null)} />
{/if}

<style>
	.hero-menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--space-lg);
		margin-top: var(--space-sm);
	}

	.hero-menu__item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: rgba(255, 255, 255, 0.85);
		font-family: var(--font-display);
		font-size: var(--font-size-md);
		font-weight: 600;
		text-decoration: none;
		padding-bottom: 3px;
		border-bottom: 2px solid transparent;
		transition: color var(--duration-fast), border-color var(--duration-fast);
	}

	.hero-menu__item:hover,
	.hero-menu__item_active {
		color: #fff;
		border-bottom-color: var(--color-primary, #ff4400);
	}

	.section {
		display: grid;
		gap: var(--space-lg);
		padding-block: var(--space-lg) var(--space-xl);
	}
</style>
