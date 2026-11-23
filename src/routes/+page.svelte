<script>
	import { base } from '$app/paths';
	import { Button } from 'babrs-ui';
	import { HeroBanner } from '$lib/components';
	import { Card } from '$lib/components';
	import gamesRegistry from '$lib/content/gamesRegistry';
</script>

<svelte:head>
	<title>Babr Games — игры для семьи</title>
	<meta name="description" content="Настольные игры Babr Games: Добрый Доббль «Байкал» и Байкальская мафия с приложением для ведущего." />
</svelte:head>

<HeroBanner title="Игры Babr Games" backgroundImage="{base}/images/dobble/baikal/hero-baikal.webp" />

<section class="container section" aria-labelledby="games-title">
	<h2 class="section__title" id="games-title">Игры</h2>
	<div class="games">
		{#each gamesRegistry as game (game.slug)}
			<Card {...game} />
		{/each}
	</div>
</section>

<style>
	.section {
		display: grid;
		gap: var(--space-lg);
		padding-block: var(--space-xl);
	}

	.games {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-lg);
	}
</style>
