<script>
	import { pullDirection } from 'babrs-ui';

	/** @type {{ characters: Array<any>, index: number, onchange: (index: number) => void, onclose: () => void }} */
	let { characters, index, onchange, onclose } = $props();

	let total = $derived(characters.length);
	let character = $derived(characters[index]);
	let direction = $state('next');

	function next() {
		direction = 'next';
		onchange((index + 1) % total);
	}

	function prev() {
		direction = 'prev';
		onchange((index - 1 + total) % total);
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Escape') onclose();
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			prev();
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			next();
		}
	}

	/** @param {{ direction: string }} gesture */
	function handleGesture({ direction: swipe }) {
		if (swipe === 'left') next();
		if (swipe === 'right') prev();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="character-modal">
	<div class="character-modal__backdrop" role="presentation" onclick={onclose}></div>
	<div class="character-modal__box" role="dialog" aria-modal="true" aria-labelledby="character-modal-title">
		<button class="character-modal__close" type="button" aria-label="Закрыть окно" onclick={onclose}>×</button>
		<button class="character-modal__nav character-modal__nav_prev" type="button" aria-label="Предыдущий персонаж" onclick={prev}>
			<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
				<path d="M30 10L16 24L30 38" />
			</svg>
		</button>
		<button class="character-modal__nav character-modal__nav_next" type="button" aria-label="Следующий персонаж" onclick={next}>
			<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
				<path d="M18 10L32 24L18 38" />
			</svg>
		</button>

		{#key index}
			<div class="character-modal__stage character-modal__stage_{direction}">
				<div class="character-modal__image" {@attach pullDirection(handleGesture, { threshold: 15 })}>
					<img
						src={character.image}
						alt={`${character.name}: персонаж игры Байкальская мафия`}
						loading="eager"
						decoding="async"
						width="520"
						height="520"
					/>
				</div>
				<div class="character-modal__content">
					<div class="character-modal__topline">
						<span class="character-modal__badge">{character.teamLabel}</span>
						<span class="character-modal__counter">{index + 1} / {total}</span>
					</div>
					<h2 class="character-modal__title" id="character-modal-title">{character.name}</h2>
					{#if character.alias}<p class="character-modal__alias">{character.alias}</p>{/if}

					{#if character.summary}
						<p class="character-modal__text">{character.summary}</p>
					{/if}
					{#if character.discrepancy}
						<p class="character-modal__note">{character.discrepancy}</p>
					{/if}
				</div>
			</div>
		{/key}
	</div>
</div>

<style>
	.character-modal {
		position: fixed;
		display: flex;
		inset: 0;
		z-index: var(--z-modal);
		padding: 1rem;
	}

	.character-modal__backdrop {
		position: fixed;
		inset: 0;
		background: var(--color-overlay);
		backdrop-filter: blur(6px);
	}

	.character-modal__box {
		position: relative;
		align-self: center;
		margin: auto;
		width: min(100%, 960px);
		max-height: min(820px, calc(100vh - 2rem));
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--shadow-floating);
		touch-action: pan-y;
	}

	.character-modal__stage {
		display: grid;
		grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
		max-height: min(820px, calc(100vh - 2rem));
		overflow: auto;
		overscroll-behavior: contain;
		will-change: transform, opacity;
	}

	.character-modal__stage_next {
		animation: card-next 260ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.character-modal__stage_prev {
		animation: card-prev 260ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	@keyframes card-next {
		from {
			opacity: 0;
			transform: translateX(34px) scale(0.985);
		}

		to {
			opacity: 1;
			transform: none;
		}
	}

	@keyframes card-prev {
		from {
			opacity: 0;
			transform: translateX(-34px) scale(0.985);
		}

		to {
			opacity: 1;
			transform: none;
		}
	}

	.character-modal__close {
		position: absolute;
		top: 0.85rem;
		right: 0.85rem;
		z-index: 4;
		width: 42px;
		height: 42px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		color: var(--color-text);
		background: color-mix(in srgb, var(--color-surface) 50%, transparent);
		font-size: 1.7rem;
		line-height: 1;
		box-shadow: var(--shadow-md);
		cursor: pointer;
	}

	.character-modal__close:hover,
	.character-modal__close:focus-visible {
		color: var(--color-on-primary);
		background: var(--color-primary);
	}

	.character-modal__nav {
		position: absolute;
		top: 50%;
		z-index: 4;
		width: 42px;
		height: 42px;
		padding: 0;
		border: 0;
		color: var(--color-ink);
		background: transparent;
		opacity: 0.05;
		cursor: pointer;
		transform: translateY(-50%);
	}

	.character-modal__nav:hover,
	.character-modal__nav:focus-visible {
		opacity: 0.2;
	}

	.character-modal__nav svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.character-modal__nav path {
		fill: none;
		stroke: currentColor;
		stroke-width: 4.4;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.character-modal__nav_prev {
		left: 1rem;
	}

	.character-modal__nav_next {
		right: 1rem;
	}

	.character-modal__image {
		display: grid;
		place-items: center;
		overflow: hidden;
		min-height: 420px;
		height: 100%;
		padding: 0;
		background: var(--color-bg);
	}

	.character-modal__image img {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 420px;
		margin: 0;
		object-fit: cover;
		user-select: none;
		-webkit-user-drag: none;
		pointer-events: none;
	}

	.character-modal__content {
		display: grid;
		align-content: center;
		gap: 1.1rem;
		padding: clamp(1.5rem, 4vw, 3rem);
	}

	.character-modal__topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.character-modal__badge {
		display: inline-flex;
		align-items: center;
		min-height: 24px;
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-pill);
		color: var(--color-primary-strong);
		background: var(--color-primary-glow);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
	}

	.character-modal__counter {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
	}

	.character-modal__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3.25rem);
		letter-spacing: -0.055em;
		line-height: var(--line-height-heading);
	}

	.character-modal__alias {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
		font-style: italic;
	}

	.character-modal__text {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-lg);
	}

	.character-modal__note {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-xs);
		border-left: 2px solid var(--color-primary);
		padding-left: 0.75rem;
	}

	@media (max-width: 760px) {
		.character-modal__stage {
			grid-template-columns: 1fr;
		}

		.character-modal__image {
			min-height: 280px;
		}

		.character-modal__image img {
			min-height: 280px;
			max-height: 320px;
		}

		.character-modal__nav {
			top: 140px;
			width: 38px;
			height: 58px;
		}

		.character-modal__nav path {
			stroke-width: 4;
		}
	}

	@media (max-width: 460px) {
		.character-modal {
			padding: 0.65rem;
		}

		.character-modal__box {
			max-height: calc(100vh - 1.3rem);
			border-radius: var(--radius-lg);
		}

		.character-modal__stage {
			max-height: calc(100vh - 1.3rem);
		}

		.character-modal__content {
			padding: 1.25rem;
		}

		.character-modal__nav {
			width: 34px;
			height: 52px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.character-modal__stage_next,
		.character-modal__stage_prev {
			animation: none;
		}
	}
</style>
