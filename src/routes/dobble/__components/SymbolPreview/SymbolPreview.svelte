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
	 * @property {'card' | 'large'} [variant] - Оформление: карточка сетки или крупный просмотр
	 */

	/** @type {Props} */
	let { symbol, variant = 'card' } = $props();
</script>

<article class="symbol symbol_{variant}">
	<div class="symbol__media">
		<img
			src={symbol.image}
			alt={`${symbol.title}: символ игры Good Dobble «Байкал»`}
			loading={variant === 'large' ? 'eager' : 'lazy'}
			decoding="async"
			width={variant === 'large' ? 520 : 320}
			height={variant === 'large' ? 520 : 220}
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
		background: var(--color-surface);
	}

	.symbol__media {
		display: grid;
		min-height: 168px;
		place-items: center;
		border-bottom: 1px solid var(--color-border);
		background:
			radial-gradient(circle at 30% 20%, rgb(207 232 247 / 0.9), transparent 7rem),
			radial-gradient(circle at 72% 60%, rgb(241 216 183 / 0.9), transparent 8rem),
			var(--color-bg-alt);
	}

	.symbol__media img {
		width: 100%;
		height: 168px;
		padding: var(--space-md);
		object-fit: contain;
	}

	.symbol_large .symbol__media {
		min-height: 0;
	}

	.symbol_large .symbol__media img {
		height: auto;
		max-height: 52vh;
	}

	.symbol__body {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-lg) var(--space-lg);
		text-align: left;
	}

	.symbol_large .symbol__body {
		padding-right: var(--space-lg);
	}

	.symbol__number {
		color: var(--color-primary-strong);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
	}

	.symbol__title {
		font-family: var(--font-display);
		font-size: var(--font-size-lg);
		line-height: 1.15;
	}

	.symbol__text {
		color: var(--color-text-muted);
	}
</style>
