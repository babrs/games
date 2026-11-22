<script>
	import { base } from '$app/paths';
	import { TabSwitcher } from 'babrs-ui';
	import { HeroBanner } from '$lib/components';;

	let { data } = $props();
	const rules = $derived(data.rules);
</script>

<svelte:head>
	<title>{rules.title} | Babrs Games</title>
	<meta name="description" content={rules.description} />
</svelte:head>

<HeroBanner backgroundImage={rules.heroImage} title="Добрый Доббль" titleImage="{base}/images/dobble/baikal/title-baikal.webp" titleAlt="Добрый Доббль" />

<TabSwitcher
	label="Разделы Good Dobble"
	active="rules"
	items={[
		{ id: 'symbols', href: `${base}/dobble/`, label: 'Символы' },
		{ id: 'rules', href: `${base}/dobble/rules/`, label: 'Правила' }
	]}
/>

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
