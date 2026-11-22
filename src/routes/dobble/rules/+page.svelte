<script>
	import { base } from '$app/paths';
	import { HeroBanner } from '$lib/components';;

	let { data } = $props();
	const rules = $derived(data.rules);
</script>

<svelte:head>
	<title>{rules.title} | Babr Games</title>
	<meta name="description" content={rules.description} />
</svelte:head>

<HeroBanner backgroundImage={rules.heroImage} title="Добрый Доббль" titleImage="{base}/images/dobble/baikal/title-baikal.webp" titleAlt="Добрый Доббль Байкал">
	<nav class="hero-menu" aria-label="Разделы Доброго Доббля">
		<a class="hero-menu__item" href="{base}/dobble/">Символы</a>
		<a class="hero-menu__item hero-menu__item_active" href="{base}/dobble/rules/">Правила</a>
	</nav>
</HeroBanner>

<section class="container section" aria-labelledby="rules-title">
	<h2 class="section__title" id="rules-title">Как играть</h2>
	<ol class="rules">
		{#each rules.rules as rule (rule.title)}
			<li class="rule">
				<h3 class="rule__title">{rule.title}</h3>
				<div class="rule__text">{@html rule.text}</div>
			</li>
		{/each}
	</ol>
</section>

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

	.rules {
		display: grid;
		gap: var(--space-md);
		max-width: 760px;
		padding-left: 0;
		list-style: none;
		counter-reset: rule;
	}

	.rule {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
	}

	.rule__title {
		font-size: var(--font-size-lg);
	}

	.rule__text {
		color: var(--color-text-muted);
	}
</style>
