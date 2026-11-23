<script>
	import { base } from '$app/paths';
	import { HeroBanner } from '$lib/components';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.rules.title} | Babr Games</title>
	<meta name="description" content={data.rules.description} />
</svelte:head>

<HeroBanner backgroundImage={data.image} title="Байкальская мафия" titleAlt="Байкальская мафия">
	<nav class="hero-menu" aria-label="Разделы Байкальской мафии">
		<a class="hero-menu__item" href="{base}/mafia/baikal/">Персонажи</a>
		<a class="hero-menu__item hero-menu__item_active" href="{base}/mafia/baikal/rules/">Правила</a>
		<a class="hero-menu__item" href="{base}/mafia/baikal/host/">Приложение ведущего</a>
	</nav>
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
	.hero-menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--space-lg);
		margin-top: auto;
		padding-top: var(--space-md);
	}

	.hero-menu__item {
		display: inline-flex;
		align-items: center;
		color: rgba(255, 255, 255, 0.85);
		font-family: var(--font-display);
		font-size: var(--font-size-md);
		font-weight: 400;
		text-decoration: none;
		padding-bottom: 4px;
		border-bottom: 3px solid transparent;
		transition: color var(--duration-fast), border-color var(--duration-fast);
	}

	.hero-menu__item:hover,
	.hero-menu__item_active {
		color: #fff;
		border-bottom-color: #fff;
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
