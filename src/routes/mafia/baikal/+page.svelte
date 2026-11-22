<script>
	import { base } from '$app/paths';
	import { TabSwitcher, GalleryModal } from 'babrs-ui';
	import { CardGrid, Logo } from '$lib/components';
	import { HeroBanner } from '$lib/components';
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

<HeroBanner backgroundImage={game.image} title={game.title} />

<div class="custom-tab-wrapper">
	<div class="container">
		<nav class="custom-tabs" aria-label="Разделы Байкальской мафии">
			<a class="custom-tab" class:active={true} href="{base}/mafia/baikal/">
				Персонажи
			</a>
			<a class="custom-tab" href="{base}/mafia/baikal/rules/">
				Правила
			</a>
			<a class="custom-tab custom-tab--host" href="{base}/mafia/baikal/host/">
				<Logo class="custom-tab__logo" />
				Приложение ведущего
			</a>
		</nav>
	</div>
</div>

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
	.custom-tab-wrapper {
		border-bottom: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	.custom-tabs {
		display: flex;
		justify-content: center;
		gap: var(--space-sm);
		padding-block: var(--space-sm);
		overflow-x: auto;
	}

	.custom-tab {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		padding: 0.5rem 1rem;
		border-radius: var(--radius-pill);
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
		transition: color var(--duration-fast), background var(--duration-fast);
		white-space: nowrap;
	}

	.custom-tab:hover,
	.custom-tab.active {
		color: var(--color-primary);
		background: var(--color-primary-glow);
	}

	.custom-tab__logo {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
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
