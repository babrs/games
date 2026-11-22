<script>
	import { base } from '$app/paths';
	import { Button } from 'babrs-ui';
	import { HeroBanner } from '$lib/components';;

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.rules.title} | Babr Games</title>
	<meta name="description" content={data.rules.description} />
</svelte:head>

<HeroBanner backgroundImage={data.image} title="Байкальская мафия" titleAlt="Байкальская мафия">
	<p class="lead">Правила для игроков и ведущего: цель, роли, порядок ночи и дня, победа и баланс.</p>
	<div class="hero-actions">
		<Button variant="secondary" href="{base}/mafia/baikal/">К персонажам</Button>
		<Button href="{base}/mafia/baikal/host/" target="_blank" rel="noopener noreferrer">Приложение ведущего</Button>
	</div>
</HeroBanner>

<section class="container section" aria-labelledby="rules-title">
	<h2 class="section__title" id="rules-title">{data.rules.title}</h2>

	{#each data.rules.sections as section (section.id)}
		<article class="rules-block" id={section.id} aria-labelledby={`${section.id}-title`}>
			<h3 class="rules-block__title" id={`${section.id}-title`}>{section.title}</h3>
			{#if section.ordered}
				<ol class="rules-block__list">
					{#each section.items as item (item)}
						<li>{item}</li>
					{/each}
				</ol>
			{:else}
				<ul class="rules-block__list">
					{#each section.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			{/if}
		</article>
	{/each}
</section>

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
		max-width: 820px;
		padding-block: var(--space-xl);
	}

	.rules-block {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
	}

	.rules-block__title {
		font-size: var(--font-size-lg);
	}

	.rules-block__list {
		display: grid;
		gap: var(--space-sm);
		padding-left: 1.25rem;
	}
</style>
