<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [backgroundImage] - Адрес фонового изображения
	 * @property {string} title - Заголовок баннера
	 * @property {string} [titleImage] - Изображение вместо видимого заголовка
	 * @property {string} [titleAlt] - Альтернативный текст изображения заголовка
	 * @property {import('svelte').Snippet} [children] - Дополнительное содержимое под заголовком
	 */

	/** @type {Props} */
	let { backgroundImage = '', title, titleImage = '', titleAlt = '', children } = $props();
</script>

<section class="hero" aria-labelledby="hero-title" style:background-image={backgroundImage ? `url(${backgroundImage})` : undefined}>
	<div class="hero__overlay"></div>
	<div class="hero__content">
		{#if titleImage}
			<img class="hero__image" src={titleImage} alt={titleAlt} />
		{/if}
		<h1 id="hero-title" class="hero__title" class:u-visually-hidden={Boolean(titleImage)}>{title}</h1>
		{@render children?.()}
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		min-height: min(65vh, 560px);
		background: var(--color-bg-alt) center / cover no-repeat;
		isolation: isolate;
	}

	.hero__overlay {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.6) 100%);
	}

	.hero__content {
		display: grid;
		align-content: center;
		justify-items: center;
		gap: var(--space-md);
		padding: calc(var(--space-xl) + 2rem) var(--space-md) var(--space-xl);
		text-align: center;
	}

	.hero__image {
		width: min(90vw, 520px);
		height: auto;
	}

	.hero__title {
		max-width: 18ch;
		color: var(--color-on-primary);
		font-family: var(--font-display);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-black);
		line-height: 1.02;
		text-shadow: 0 18px 48px rgb(0 0 0 / 0.38);
	}
</style>
