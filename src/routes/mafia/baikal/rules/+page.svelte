<script>
	import { base } from '$app/paths';
	import { TabSwitcher } from 'babrs-ui';
	import { HeroBanner } from '$lib/components';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.rules.title} | Babr Games</title>
	<meta name="description" content={data.rules.description} />
</svelte:head>

<HeroBanner backgroundImage={data.image} title="Байкальская мафия" titleAlt="Байкальская мафия" />

<TabSwitcher
	label="Разделы Байкальской мафии"
	active="rules"
	items={[
		{ id: 'characters', href: `${base}/mafia/baikal/`, label: 'Персонажи' },
		{ id: 'rules', href: `${base}/mafia/baikal/rules/`, label: 'Правила' },
		{ id: 'host', href: `${base}/mafia/baikal/host/`, label: 'Приложение ведущего', external: true }
	]}
/>

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
		pfont-size: var(--font-size-lg);
	}

	.rules-block__list {
		display: grid;
		gap: var(--space-sm);
		padding-left: 1.25rem;
	}
</style>
