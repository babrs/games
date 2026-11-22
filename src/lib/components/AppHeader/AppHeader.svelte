<script>
	import { outsideClick } from '$lib/attachments';
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
	let { brand, tagline, homeHref, navItems = [] } = $props();

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="app-header">
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
			<span class="app-header__burger-line"></span>
			<span class="app-header__burger-line"></span>
			<span class="app-header__burger-line"></span>
		</button>

		<nav
			class="app-header__nav"
			class:app-header__nav_open={menuOpen}
			aria-label="Основная навигация"
			{@attach outsideClick(closeMenu)}
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
		position: sticky;
		top: 0;
		z-index: var(--z-header, 100);
		border-bottom: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-surface) 90%, transparent);
		backdrop-filter: blur(12px);
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
		color: var(--color-text);
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
		color: var(--color-text-muted);
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
		cursor: pointer;
	}

	.app-header__burger-line {
		display: block;
		width: 100%;
		height: 3px;
		border-radius: var(--radius-pill);
		background: var(--color-text);
		transition: transform var(--duration-fast), opacity var(--duration-fast);
	}

	.app-header__nav {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.app-header__link {
		padding: 0.5rem 0.85rem;
		border-radius: var(--radius-pill);
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
	}

	.app-header__link:hover,
	.app-header__link_current {
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
			box-shadow: var(--shadow-md);
			opacity: 0;
			visibility: hidden;
			transform: translateY(-8px);
			transition: opacity var(--duration-fast), transform var(--duration-fast), visibility var(--duration-fast);
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
			background: var(--color-primary-glow);
		}
	}
</style>
