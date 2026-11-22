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
	 */

	/** @type {Props} */
	let { character } = $props();

	const tones = { peaceful: 'success', predator: 'danger', special: 'info' };
</script>

<article class="character">
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
		{/if}
	</div>
</article>

<style>
	.character {
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

	.character:hover {
		border-color: color-mix(in srgb, var(--color-primary) 35%, transparent);
		box-shadow: var(--shadow-md);
	}

	.character__media {
		display: grid;
		place-items: center;
		border-bottom: 1px solid var(--color-border);
		background:
			radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-sky) 90%, transparent), transparent 7rem),
			radial-gradient(circle at 72% 60%, color-mix(in srgb, var(--color-sand) 90%, transparent), transparent 8rem),
			var(--color-bg);
	}

	.character__media img {
		width: 100%;
		height: 240px;
		padding: var(--space-md);
		object-fit: contain;
		transition: transform var(--duration-base) var(--easing-standard);
	}

	.character:hover .character__media img {
		transform: scale(1.04) rotate(-1deg);
	}

	.character__body {
		display: grid;
		gap: 0.55rem;
		padding: var(--space-md);
		text-align: left;
	}

	.character__meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.character__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-md);
		letter-spacing: -0.04em;
		line-height: var(--line-height-heading);
	}

	.character__when {
		display: -webkit-box;
		margin: 0;
		overflow: hidden;
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	@media (prefers-reduced-motion: reduce) {
		.character,
		.character__media img {
			transition: none;
		}

		.character:hover .character__media img {
			transform: none;
		}
	}
</style>
