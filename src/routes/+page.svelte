<script>
	import { base } from '$app/paths';
	import { Button } from 'babrs-ui';
	import { HeroBanner } from '$lib/components';;
	import { Card } from '$lib/components';
	import gamesRegistry from '$lib/content/gamesRegistry';
</script>

<svelte:head>
	<title>Babrs Games — игры для семьи</title>
	<meta name="description" content="Настольные игры Babrs: Good Dobble «Байкал» и Байкальская мафия с приложением для ведущего." />
</svelte:head>

<HeroBanner title="Игры Babrs" backgroundImage="{base}/images/dobble/baikal/hero-baikal.webp">
	<p class="lead"><strong>Привет! Я Бабр.</strong> Настольные игры с понятными правилами, красивыми карточками и приложением для ведущего.</p>
</HeroBanner>

<section class="container section" aria-labelledby="games-title">
	<h2 class="section__title" id="games-title">Игры</h2>
	<div class="games">
		{#each gamesRegistry as game (game.slug)}
			<Card elevated>
				<div class="game">
					<h3 class="game__title">{game.title}</h3>
					<p class="game__text">{game.text}</p>
					<Button href={`${base}/${game.path}`}>Играть</Button>
				</div>
			</Card>
		{/each}
	</div>
</section>

<style>
	.lead {
		max-width: 56ch;
		margin-inline: auto;
		font-size: var(--font-size-lg);
	}

	.section {
		display: grid;
		gap: var(--space-lg);
		padding-block: var(--space-xl);
	}

	.games {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
		gap: var(--space-lg);
	}

	.game {
		display: grid;
		gap: var(--space-md);
		padding: var(--space-xl) var(--space-lg);
		justify-items: start;
	}

	.game__title {
		font-family: var(--font-display);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-black);
		line-height: 1.1;
	}

	.game__text {
		color: var(--color-text-muted);
	}
</style>
