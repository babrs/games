<script>
	import { base } from '$app/paths';
	import { Button, GalleryModal } from 'babrs-ui';
	import CardGrid from '$lib/svelte/ui/CardGrid/index.js';
	import HeroBanner from '$lib/svelte/ui/HeroBanner/index.js';;
	import CharacterCard from './__components/CharacterCard/index.js';

	let { data } = $props();
	const game = $derived(data.game);

	let openIndex = $state(null);
</script>

<svelte:head>
	<title>Байкальская мафия — персонажи и правила | Babrs Games</title>
	<meta name="description" content={game.description} />
</svelte:head>

<HeroBanner backgroundImage={game.image} title={game.title}>
	<p class="lead">{game.description}</p>
	<div class="hero-actions">
		<Button size="lg" href="{base}/mafia/baikal/rules/">Правила игры</Button>
		<Button size="lg" variant="secondary" href="{base}/mafia/baikal/host/">Приложение ведущего</Button>
	</div>
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
	<GalleryModal
		items={game.characters}
		index={openIndex}
		labelledby="character-title"
		onchange={(next) => (openIndex = next)}
		onclose={() => (openIndex = null)}
	>
		{#snippet item(character)}
			<CharacterCard {character} variant="large" />
		{/snippet}
	</GalleryModal>
{/if}

<style>
	.lead {
		max-width: 60ch;
		margin-inline: auto;
		font-size: var(--font-size-lg);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-md);
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
