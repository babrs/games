<script>
	/**
	 * @typedef {Object} Link
	 * @property {string} href - Ссылка
	 * @property {string} label - Текст ссылки
	 * @property {boolean} [external] - Внешняя ссылка
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} title - Название сайта/бренда
	 * @property {string} [tagline] - Слоган
	 * @property {Array<Link>} [links] - Ссылки футера
	 * @property {string} [note] - Примечание
	 */

	/** @type {Props} */
	let { title, tagline, links = [], note } = $props();
</script>

<footer class="app-footer">
	<div class="container app-footer__inner">
		<div class="app-footer__brand">
			<span class="app-footer__title">{title}</span>
			{#if tagline}<p class="app-footer__tagline">{tagline}</p>{/if}
		</div>

		{#if links.length > 0}
			<nav class="app-footer__nav" aria-label="Ссылки в подвале">
				{#each links as link (link.href)}
					<a
						class="app-footer__link"
						href={link.href}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		{/if}

		{#if note}
			<p class="app-footer__note">{note}</p>
		{/if}
	</div>
</footer>

<style>
	.app-footer {
		border-top: 1px solid var(--color-border);
		background: var(--color-surface);
		padding-block: var(--space-xl);
	}

	.app-footer__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-lg);
	}

	.app-footer__brand {
		display: grid;
		gap: var(--space-xs);
	}

	.app-footer__title {
		font-family: var(--font-display);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
	}

	.app-footer__tagline {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	.app-footer__nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-md);
	}

	.app-footer__link {
		color: var(--color-text);
		font-size: var(--font-size-sm);
		text-decoration: none;
		transition: color var(--duration-fast);
	}

	.app-footer__link:hover {
		color: var(--color-primary);
	}

	.app-footer__note {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-xs);
	}
</style>
