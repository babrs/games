<script>
	/**
	 * @typedef {Object} Symbol
	 * @property {number} id - Номер символа
	 * @property {string} title - Название символа
	 * @property {string} description - Короткое описание
	 * @property {string} [fullDescription] - Развёрнутое описание
	 * @property {string} image - Путь к изображению от корня сайта
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Symbol} symbol - Символ игры
	 */

	/** @type {Props} */
	let { symbol } = $props();
</script>

<article class="symbol">
	<div class="symbol__media">
		<img
			src={symbol.image}
			alt={`${symbol.title}: символ игры Добрый Доббль «Байкал»`}
			loading="lazy"
			decoding="async"
			width="320"
			height="220"
		/>
	</div>
	<div class="symbol__body">
		<span class="symbol__number">№ {symbol.id}</span>
		<h3 class="symbol__title">{symbol.title}</h3>
		<p class="symbol__text">{symbol.fullDescription || symbol.description}</p>
	</div>
</article>

<style>
	.symbol {
		display: grid;
		height: 100%;
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: var(--shadow-sm);
		transition:
			border-color var(--duration-fast),
			box-shadow var(--duration-fast);
	}

	.symbol:hover {
		border-color: color-mix(in srgb, var(--color-primary) 35%, transparent);
		box-shadow: var(--shadow-md);
	}

	.symbol__media {
		display: grid;
		min-height: 168px;
		place-items: center;
		border-bottom: 1px solid var(--color-border);
		background:
			radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-sky) 90%, transparent), transparent 7rem),
			radial-gradient(circle at 72% 60%, color-mix(in srgb, var(--color-sand) 90%, transparent), transparent 8rem),
			var(--color-bg);
	}

	.symbol__media img {
		width: 100%;
		height: 168px;
		padding: var(--space-md);
		object-fit: contain;
		transition: transform var(--duration-base) var(--easing-standard);
	}

	.symbol:hover .symbol__media img {
		transform: scale(1.04) rotate(-1deg);
	}

	.symbol__body {
		display: grid;
		gap: 0.55rem;
		padding: var(--space-md);
		text-align: left;
	}

	.symbol__number {
		color: var(--color-primary);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
	}

	.symbol__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-md);
		letter-spacing: -0.04em;
		line-height: var(--line-height-heading);
	}

	.symbol__text {
		display: -webkit-box;
		margin: 0;
		overflow: hidden;
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	@media (prefers-reduced-motion: reduce) {
		.symbol,
		.symbol__media img {
			transition: none;
		}

		.symbol:hover .symbol__media img {
			transform: none;
		}
	}
</style>
