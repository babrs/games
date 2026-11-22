<script>
	import { base } from '$app/paths';
	import { HeroBanner } from '$lib/components';
	import { CardGrid } from '$lib/components';
	import CharacterCard from './__components/CharacterCard/index.js';
	import CharacterModal from './__components/CharacterModal/index.js';

	let { data } = $props();
	const game = $derived(data.game);

	let openIndex = $state(null);
</script>

<svelte:head>
	<title>Байкальская мафия — персонажи и правила | Babr Games</title>
	<meta name="description" content={game.description} />
</svelte:head>

<HeroBanner backgroundImage={game.image} title={game.title}>
	<nav class="hero-menu" aria-label="Разделы Байкальской мафии">
		<a class="hero-menu__item hero-menu__item_active" href="{base}/mafia/baikal/">Персонажи</a>
		<a class="hero-menu__item" href="{base}/mafia/baikal/rules/">Правила</a>
		<a class="hero-menu__item" href="{base}/mafia/baikal/host/">Приложение ведущего</a>
	</nav>
</HeroBanner>

<section class="container section facts" aria-label="Главное об игре">
	{#each game.facts as fact (fact.label)}
		<div class="fact">
			<span class="fact__label">{fact.label}</span>
			<strong class="fact__value">{fact.value}</strong>
		</div>
	{/each}
</section>

<section class="container section" aria-labelledby="characters-title">
	<h2 class="section__title" id="characters-title">Персонажи</h2>
	<p class="section__lead">Нажмите на карточку, чтобы увидеть текст с карточки и справку по правилам. Листайте стрелками или свайпом.</p>

	<CardGrid items={game.characters} label="Персонажи Байкальской мафии" onopen={(index) => (openIndex = index)}>
		{#snippet item(character)}
			<CharacterCard {character} />
		{/snippet}
	</CardGrid>
</section>

{#if openIndex !== null}
	<CharacterModal
		characters={game.characters}
		index={openIndex}
		onchange={(next) => (openIndex = next)}
		onclose={() => (openIndex = null)}
	/>
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
		padding-block: var(--space-xl);
	}

	.facts {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		padding-block: var(--space-lg);
	}

	.fact {
		display: grid;
		gap: var(--space-xs);
		padding: var(--space-md) var(--space-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
	}

	.fact__label {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	.fact__value {
		font-size: var(--font-size-md);
	}
</style>
