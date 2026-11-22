<script>
	import { pullDirection } from 'babrs-ui';

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
	 * @property {Symbol[]} symbols - Символы игры
	 * @property {number} index - Индекс открытого символа
	 * @property {(index: number) => void} onchange - Переход к другому символу
	 * @property {() => void} onclose - Закрытие окна
	 */

	/** @type {Props} */
	let { symbols, index, onchange, onclose } = $props();

	let total = $derived(symbols.length);
	let symbol = $derived(symbols[index]);
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

<div class="symbol-modal">
	<div class="symbol-modal__backdrop" role="presentation" onclick={onclose}></div>
	<div class="symbol-modal__box" role="dialog" aria-modal="true" aria-labelledby="symbol-modal-title">
		<button class="symbol-modal__close" type="button" aria-label="Закрыть окно" onclick={onclose}>×</button>
		<button class="symbol-modal__nav symbol-modal__nav_prev" type="button" aria-label="Предыдущий символ" onclick={prev}>
			<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
				<path d="M30 10L16 24L30 38" />
			</svg>
		</button>
		<button class="symbol-modal__nav symbol-modal__nav_next" type="button" aria-label="Следующий символ" onclick={next}>
			<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
				<path d="M18 10L32 24L18 38" />
			</svg>
		</button>

		{#key index}
			<div class="symbol-modal__stage symbol-modal__stage_{direction}">
				<div class="symbol-modal__image" {@attach pullDirection(handleGesture, { threshold: 15 })}>
					<img
						src={symbol.image}
						alt={`${symbol.title}: символ игры Good Dobble «Байкал»`}
						loading="eager"
						decoding="async"
						width="520"
						height="520"
					/>
				</div>
				<div class="symbol-modal__content">
					<div class="symbol-modal__topline">
						<span class="symbol-modal__badge">Символ № {symbol.id}</span>
						<span class="symbol-modal__counter">{index + 1} / {total}</span>
					</div>
					<h2 class="symbol-modal__title" id="symbol-modal-title">{symbol.title}</h2>
					<p class="symbol-modal__text">{symbol.fullDescription || symbol.description}</p>
				</div>
			</div>
		{/key}
	</div>
</div>

<style>
	.symbol-modal {
		position: fixed;
		display: flex;
		inset: 0;
		z-index: var(--z-modal);
		padding: 1rem;
	}

	.symbol-modal__backdrop {
		position: fixed;
		inset: 0;
		background: var(--color-overlay);
		backdrop-filter: blur(6px);
	}

	.symbol-modal__box {
		position: relative;
		align-self: center;
		margin: auto;
		width: min(100%, 920px);
		max-height: min(760px, calc(100vh - 2rem));
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--shadow-floating);
		touch-action: pan-y;
	}

	.symbol-modal__stage {
		display: grid;
		grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1fr);
		max-height: min(760px, calc(100vh - 2rem));
		overflow: auto;
		overscroll-behavior: contain;
		will-change: transform, opacity;
	}

	.symbol-modal__stage_next {
		animation: card-next 260ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.symbol-modal__stage_prev {
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

	.symbol-modal__close {
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

	.symbol-modal__close:hover,
	.symbol-modal__close:focus-visible {
		color: var(--color-on-primary);
		background: var(--color-primary);
	}

	.symbol-modal__nav {
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

	.symbol-modal__nav:hover,
	.symbol-modal__nav:focus-visible {
		opacity: 0.2;
	}

	.symbol-modal__nav svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.symbol-modal__nav path {
		fill: none;
		stroke: currentColor;
		stroke-width: 4.4;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.symbol-modal__nav_prev {
		left: 1rem;
	}

	.symbol-modal__nav_next {
		right: 1rem;
	}

	.symbol-modal__image {
		min-height: 420px;
		padding: 1.5rem;
		background:
			radial-gradient(circle at 32% 24%, color-mix(in srgb, var(--color-sky) 95%, transparent), transparent 9rem),
			radial-gradient(circle at 70% 68%, color-mix(in srgb, var(--color-sand) 95%, transparent), transparent 10rem),
			var(--color-bg-alt);
	}

	.symbol-modal__image img {
		display: block;
		width: min(100%, 340px);
		max-height: 380px;
		margin: auto;
		object-fit: contain;
		filter: drop-shadow(0 18px 28px color-mix(in srgb, var(--color-text) 12%, transparent));
		user-select: none;
		-webkit-user-drag: none;
		pointer-events: none;
	}

	.symbol-modal__content {
		display: grid;
		align-content: center;
		gap: 1.1rem;
		padding: clamp(1.5rem, 4vw, 3rem);
	}

	.symbol-modal__topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.symbol-modal__badge {
		display: inline-flex;
		align-items: center;
		min-height: 24px;
		padding: 0.25rem 0.55rem;
		border-radius: var(--radius-pill);
		color: var(--color-primary-strong);
		background: var(--color-primary-glow);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
	}

	.symbol-modal__counter {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
	}

	.symbol-modal__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3.25rem);
		letter-spacing: -0.055em;
		line-height: var(--line-height-heading);
	}

	.symbol-modal__text {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-lg);
	}

	@media (max-width: 760px) {
		.symbol-modal__stage {
			grid-template-columns: 1fr;
		}

		.symbol-modal__image {
			min-height: 280px;
			padding-top: 4rem;
		}

		.symbol-modal__image img {
			max-height: 240px;
		}

		.symbol-modal__nav {
			top: 190px;
			width: 38px;
			height: 58px;
		}

		.symbol-modal__nav path {
			stroke-width: 4;
		}
	}

	@media (max-width: 460px) {
		.symbol-modal {
			padding: 0.65rem;
		}

		.symbol-modal__box {
			max-height: calc(100vh - 1.3rem);
			border-radius: var(--radius-lg);
		}

		.symbol-modal__stage {
			max-height: calc(100vh - 1.3rem);
		}

		.symbol-modal__content {
			padding: 1.25rem;
		}

		.symbol-modal__nav {
			width: 34px;
			height: 52px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.symbol-modal__stage_next,
		.symbol-modal__stage_prev {
			animation: none;
		}
	}
</style>
