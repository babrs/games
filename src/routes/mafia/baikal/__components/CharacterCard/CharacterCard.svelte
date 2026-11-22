<script>
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

	const teamClasses = {
		peaceful: 'character__team_peaceful',
		predator: 'character__team_predator',
		special: 'character__team_special'
	};
</script>

<article class="character">
	<div class="character__media">
		<img
			src={character.image}
			alt={`Карточка «${character.name}»`}
			width="600"
			height="858"
			loading="lazy"
			decoding="async"
		/>
	</div>

	<div class="character__body">
		<h3 class="character__title">{character.name}</h3>
		<p class="character__when">
			<span class="character__team {teamClasses[character.team]}">{character.teamLabel}</span>
			{character.summary}
		</p>
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
		gap: 0.4rem;
		padding: var(--space-md);
		text-align: left;
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
		line-height: 1.4;
	}

	.character__team {
		font-weight: var(--font-weight-bold);
	}

	.character__team_peaceful {
		color: var(--color-success);
	}

	.character__team_predator {
		color: var(--color-danger);
	}

	.character__team_special {
		color: var(--color-info);
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
