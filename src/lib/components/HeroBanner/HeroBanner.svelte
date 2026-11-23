<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [backgroundImage] - Адрес фонового изображения
	 * @property {string} title - Заголовок баннера
	 * @property {string} [titleImage] - Изображение вместо видимого заголовка
	 * @property {string} [titleAlt] - Альтернативный текст изображения заголовка
	 * @property {string} [subtitle] - Подзаголовок под изображением
	 * @property {import('svelte').Snippet} [children] - Дополнительное содержимое под заголовком
	 */

	/** @type {Props} */
	let { backgroundImage = '', title, titleImage = '', titleAlt = '', subtitle = '', children } = $props();
</script>

<section class="hero" aria-labelledby="hero-title" style:background-image={backgroundImage ? `url(${backgroundImage})` : undefined}>
	<div class="hero__overlay"></div>
	<div class="hero__content">
		{#if titleImage}
			<div class="hero__image-wrapper">
				<img class="hero__image" src={titleImage} alt={titleAlt} />
				{#if subtitle}
					<h2 class="hero__subtitle">{subtitle}</h2>
				{/if}
			</div>
		{/if}
		<h1 id="hero-title" class="hero__title" class:u-visually-hidden={Boolean(titleImage)}>{title}</h1>
		{@render children?.()}
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		min-height: min(70vh, 640px);
		background: var(--color-bg-alt) center / cover no-repeat;
		isolation: isolate;
	}

	.hero__overlay {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.5) 100%);
	}

	.hero__content {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		gap: var(--space-md);
		padding: calc(var(--space-xl) + 2rem) var(--space-md) var(--space-xl);
		text-align: center;
	}

	.hero__image-wrapper {
		display: grid;
		gap: 0.25rem;
		justify-items: center;
		margin-top: auto;
	}

	.hero__image {
		width: min(90vw, 560px);
		height: auto;
	}

	.hero__subtitle {
		margin: 0;
		color: var(--color-on-primary);
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: var(--font-weight-black);
		line-height: 1.1;
		text-shadow: 0 12px 36px rgb(0 0 0 / 0.45);
	}

	.hero__title {
		max-width: 18ch;
		color: var(--color-on-primary);
		font-family: var(--font-display);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-black);
		line-height: 1.02;
		text-shadow: 0 18px 48px rgb(0 0 0 / 0.38);
		margin-top: auto;
	}
</style>
