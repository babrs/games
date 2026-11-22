<script>
	import { base } from '$app/paths';
	import { HeroBanner, Logo } from '$lib/components';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.rules.title} | Babr Games</title>
	<meta name="description" content={data.rules.description} />
</svelte:head>

<HeroBanner backgroundImage={data.image} title="Байкальская мафия" titleAlt="Байкальская мафия" />

<div class="custom-tab-wrapper">
	<div class="container">
		<nav class="custom-tabs" aria-label="Разделы Байкальской мафии">
			<a class="custom-tab" href="{base}/mafia/baikal/">
				Персонажи
			</a>
			<a class="custom-tab" class:active={true} href="{base}/mafia/baikal/rules/">
				Правила
			</a>
			<a class="custom-tab custom-tab--host" href="{base}/mafia/baikal/host/">
				<Logo class="custom-tab__logo" />
				Приложение ведущего
			</a>
		</nav>
	</div>
</div>

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
