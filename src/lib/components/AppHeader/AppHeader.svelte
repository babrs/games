<script>
	import { outsideClick, smartHeader } from '$lib/attachments';
	import { Logo } from '$lib/components';

	/**
	 * @typedef {Object} NavItem
	 * @property {string} href - Ссылка
	 * @property {string} label - Текст ссылки
	 * @property {boolean} [current] - Текущая страница
	 */

	/**
	 * @typedef {Object} Props
	 * @property {string} brand - Название бренда
	 * @property {string} [tagline] - Подзаголовок
	 * @property {string} homeHref - Ссылка на главную
	 * @property {Array<NavItem>} navItems - Пункты меню
	 */

	/** @type {Props} */
	let { brand = 'Babr Games', tagline, homeHref, navItems = [] } = $props();

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="app-header" {@attach smartHeader({ topOffset: 0, onhide: closeMenu })}>
	<div class="container app-header__inner">
		<a class="app-header__brand" href={homeHref} onclick={closeMenu}>
			<Logo />
			<div class="app-header__titles">
				<span class="app-header__title">{brand}</span>
				{#if tagline}<span class="app-header__tagline">{tagline}</span>{/if}
			</div>
		</a>

		<button
			class="app-header__burger"
			type="button"
			aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
			aria-expanded={menuOpen}
			onclick={toggleMenu}
		>
			<span class="app-header__burger-line" class:app-header__burger-line_open={menuOpen}></span>
			<span class="app-header__burger-line" class:app-header__burger-line_open={menuOpen}></span>
			<span class="app-header__burger-line" class:app-header__burger-line_open={menuOpen}></span>
		</button>

		<nav
			class="app-header__nav"
			class:app-header__nav_open={menuOpen}
			aria-label="Основная навигация"
			{@attach outsideClick(closeMenu, { ignore: '.app-header__burger' })}
		>
			{#each navItems as item (item.href)}
				<a
					class="app-header__link"
					class:app-header__link_current={item.current}
					href={item.href}
					aria-current={item.current ? 'page' : undefined}
					onclick={closeMenu}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	.app-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: var(--z-header, 100);
		border-bottom: 1px solid transparent;
		background: transparent;
		color: var(--color-on-hero, #fff);
		transform: translate3d(0, var(--smart-header-shift, 0px), 0);
		transition:
			background-color 350ms cubic-bezier(0.22, 1, 0.36, 1),
			border-color 350ms cubic-bezier(0.22, 1, 0.36, 1),
			color 350ms cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 350ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.app-header:global([data-solid]) {
		border-bottom-color: var(--color-border);
		background: color-mix(in srgb, var(--color-surface) 92%, transparent);
		backdrop-filter: blur(12px);
		color: var(--color-text);
		box-shadow: var(--shadow-sm);
	}

	.app-header__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 4.5rem;
		gap: var(--space-md);
	}

	.app-header__brand {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: inherit;
		text-decoration: none;
	}

	.app-header__brand :global(svg) {
		width: 36px;
		height: 36px;
		flex-shrink: 0;
	}

	.app-header__titles {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.app-header__title {
		font-family: var(--font-display);
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-bold);
		letter-spacing: -0.03em;
		line-height: 1.2;
	}

	.app-header__tagline {
		opacity: 0.8;
		font-size: var(--font-size-xs);
		line-height: 1.2;
	}

	.app-header__burger {
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 32px;
		height: 24px;
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		cursor: pointer;
	}

	.app-header__burger-line {
		display: block;
		width: 100%;
		height: 3px;
		border-radius: var(--radius-pill);
		background: currentColor;
		transition: transform var(--duration-fast), opacity var(--duration-fast);
	}

	.app-header__burger-line_open:nth-child(1) {
		transform: translateY(10.5px) rotate(45deg);
	}

	.app-header__burger-line_open:nth-child(2) {
		opacity: 0;
	}

	.app-header__burger-line_open:nth-child(3) {
		transform: translateY(-10.5px) rotate(-45deg);
	}

	.app-header__nav {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.app-header__link {
		padding: 0.5rem 0.85rem;
		border-radius: var(--radius-pill);
		color: inherit;
		opacity: 0.85;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
		transition:
			opacity var(--duration-fast),
			background-color var(--duration-fast),
			color var(--duration-fast);
	}

	.app-header__link:hover,
	.app-header__link_current {
		opacity: 1;
		background: rgb(255 255 255 / 0.18);
	}

	.app-header:global([data-solid]) .app-header__link:hover,
	.app-header:global([data-solid]) .app-header__link_current {
		color: var(--color-primary);
		background: var(--color-primary-glow);
	}

	@media (max-width: 640px) {
		.app-header__burger {
			display: flex;
		}

		.app-header__nav {
			position: absolute;
			top: 100%;
			right: 0;
			left: 0;
			display: grid;
			gap: var(--space-xs);
			padding: var(--space-md);
			border-bottom: 1px solid var(--color-border);
			background: var(--color-surface);
			color: var(--color-text);
			box-shadow: var(--shadow-md);
			opacity: 0;
			visibility: hidden;
			transform: translateY(-8px);
			transition:
				opacity var(--duration-fast),
				transform var(--duration-fast),
				visibility var(--duration-fast);
		}

		.app-header__nav_open {
			opacity: 1;
			visibility: visible;
			transform: none;
		}

		.app-header__link {
			padding: 0.75rem 1rem;
			border-radius: var(--radius-md);
		}

		.app-header__link:hover,
		.app-header__link_current {
			color: var(--color-primary);
			background: var(--color-primary-glow);
		}
	}
</style>
