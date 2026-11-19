<script>
	import { Badge } from 'babrs-ui';

	/**
	 * @typedef {Object} Character
	 * @property {string} id - Идентификатор персонажа
	 * @property {string} name - Название на карточке
	 * @property {string} image - Изображение карточки от корня сайта
	 * @property {'peaceful' | 'predator' | 'special'} team - Команда
	 * @property {string} teamLabel - Подпись команды
	 * @property {string} when - Когда действует
	 * @property {string} cardText - Текст на карточке
	 * @property {string} summary - Справка по правилам
	 * @property {string} [alias] - Название в правилах, если отличается
	 * @property {boolean} [oneTime] - Действует один раз за игру
	 * @property {string} [discrepancy] - Замечание о расхождении текста и правил
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Character} character - Персонаж
	 * @property {'card' | 'large'} [variant] - Оформление: карточка сетки или крупный просмотр
	 */

	/** @type {Props} */
	let { character, variant = 'card' } = $props();

	const tones = { peaceful: 'success', predator: 'danger', special: 'info' };
</script>

<article class="character character_{variant}">
	<div class="character__media">
		<img
			src={character.image}
			alt={`Карточка «${character.name}»`}
			width="600"
			height="858"
			loading={variant === 'large' ? 'eager' : 'lazy'}
			decoding="async"
		/>
	</div>

	<div class="character__body">
		<div class="character__meta">
			<Badge tone={tones[character.team]}>{character.teamLabel}</Badge>
			{#if character.oneTime}<Badge>Один раз за игру</Badge>{/if}
		</div>

		{#if variant === 'large'}
			<h2 class="character__title" id="character-title">{character.name}</h2>
			{#if character.alias}<p class="character__alias">{character.alias}</p>{/if}
			<dl class="character__facts">
				<div>
					<dt>Когда действует</dt>
					<dd>{character.when}</dd>
				</div>
				<div>
					<dt>Текст на карточке</dt>
					<dd>{character.cardText}</dd>
				</div>
				<div>
					<dt>Справка по правилам</dt>
					<dd>{character.summary}</dd>
				</div>
			</dl>
			{#if character.discrepancy}<p class="character__note">{character.discrepancy}</p>{/if}
		{:else}
			<h3 class="character__title">{character.name}</h3>
			<p class="character__when">{character.when}</p>
		{/if}
	</div>
</article>

<style>
	.character {
		display: grid;
		height: 100%;
		background: var(--color-surface);
	}

	.character__media {
		background: var(--color-bg-alt);
	}

	.character__media img {
		width: 100%;
		height: auto;
		aspect-ratio: 600 / 858;
		object-fit: cover;
	}

	.character_large .character__media img {
		max-height: 58vh;
		width: auto;
		margin-inline: auto;
		object-fit: contain;
	}

	.character__body {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-lg) var(--space-lg);
		text-align: left;
	}

	.character__meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.character__title {
		font-family: var(--font-display);
		font-size: var(--font-size-lg);
		line-height: 1.15;
	}

	.character__alias,
	.character__when {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	.character__facts {
		display: grid;
		gap: var(--space-md);
	}

	.character__facts dt {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
	}

	.character__facts dd {
		margin-top: var(--space-xs);
	}

	.character__note {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		background: var(--color-bg-alt);
		font-size: var(--font-size-sm);
	}
</style>
