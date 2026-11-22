<script>
	import { outsideClick, smartHeader } from '$lib/attachments';
	import { Logo } from '$lib/components';
	import { base } from '$app/paths';
	import { page } from '$app/state';

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

	const currentPath = $derived(page.url.pathname);
	const isDobble = $derived(currentPath.startsWith(`${base}/dobble`));
	const isMafia = $derived(currentPath.startsWith(`${base}/mafia/baikal`));

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
	</div>
</header>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="app-header__overlay"
	class:app-header__overlay_open={menuOpen}
	onclick={closeMenu}
></div>

<nav
	class="app-header__nav"
	class:app-header__nav_open={menuOpen}
	aria-label="Основная навигация"
	{@attach outsideClick(closeMenu, { ignore: '.app-header__burger' })}
>
	<div class="app-header__nav-inner">
		{#each navItems as item (item.href)}
			<div class="app-header__nav-item-group">
				<a
					class="app-header__link"
					class:app-header__link_current={item.current}
					href={item.href}
					aria-current={item.current ? 'page' : undefined}
					onclick={closeMenu}
				>
					{item.label}
				</a>

				{#if item.href.includes('/dobble') && isDobble}
					<div class="app-header__subnav">
						<a
							class="app-header__sublink"
							class:app-header__sublink_current={currentPath === `${base}/dobble/` || currentPath === `${base}/dobble`}
							href="{base}/dobble/"
							onclick={closeMenu}
						>
							Символы
						</a>
						<a
							class="app-header__sublink"
							class:app-header__sublink_current={currentPath.startsWith(`${base}/dobble/rules`)}
							href="{base}/dobble/rules/"
							onclick={closeMenu}
						>
							Правила
						</a>
					</div>
				{/if}

				{#if item.href.includes('/mafia/baikal') && isMafia}
					<div class="app-header__subnav">
						<a
							class="app-header__sublink"
							class:app-header__sublink_current={currentPath === `${base}/mafia/baikal/` || currentPath === `${base}/mafia/baikal`}
							href="{base}/mafia/baikal/"
							onclick={closeMenu}
						>
							Персонажи
						</a>
						<a
							class="app-header__sublink"
							class:app-header__sublink_current={currentPath.startsWith(`${base}/mafia/baikal/rules`)}
							href="{base}/mafia/baikal/rules/"
							onclick={closeMenu}
						>
							Правила
						</a>
						<a
							class="app-header__sublink"
							href="{base}/mafia/baikal/host/"
							onclick={closeMenu}
						>
							Приложение ведущего
						</a>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</nav>

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
		z-index: 110;
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

	.app-header__overlay {
		display: none;
	}

	.app-header__subnav {
		display: none;
	}

	@media (max-width: 640px) {
		.app-header__burger {
			display: flex;
		}

		.app-header__overlay {
			position: fixed;
			inset: 0;
			display: block;
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(2px);
			opacity: 0;
			visibility: hidden;
			transition: opacity 300ms ease, visibility 300ms ease;
			z-index: 104;
		}

		.app-header__overlay_open {
			opacity: 1;
			visibility: visible;
		}

		.app-header__nav {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			width: min(80vw, 300px);
			display: flex;
			flex-direction: column;
			padding: calc(var(--space-xl) + 2rem) var(--space-lg) var(--space-xl);
			background: var(--color-surface);
			color: var(--color-text);
			box-shadow: -8px 0 32px rgba(0, 0, 0, 0.25);
			transform: translateX(100%);
			visibility: hidden;
			transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), visibility 300ms ease;
			z-index: 105;
			overflow-y: auto;
		}

		.app-header__nav_open {
			transform: translateX(0);
			visibility: visible;
		}

		.app-header__nav-inner {
			display: grid;
			gap: var(--space-md);
			width: 100%;
		}

		.app-header__nav-item-group {
			display: grid;
			gap: var(--space-xs);
		}

		.app-header__link {
			display: block;
			padding: 0.75rem 1rem;
			border-radius: var(--radius-md);
			font-size: var(--font-size-md);
		}

		.app-header__link:hover,
		.app-header__link_current {
			background: var(--color-primary-glow);
			color: var(--color-primary);
		}

		.app-header__subnav {
			display: grid;
			gap: 0.2rem;
			padding-left: 1rem;
			border-left: 2px solid var(--color-border);
			margin-left: 0.5rem;
		}

		.app-header__sublink {
			padding: 0.5rem 0.75rem;
			border-radius: var(--radius-sm);
			color: var(--color-text-muted);
			font-size: var(--font-size-sm);
			font-weight: 500;
			text-decoration: none;
			transition: color var(--duration-fast), background var(--duration-fast);
		}

		.app-header__sublink:hover,
		.app-header__sublink_current {
			color: var(--color-primary);
			background: var(--color-primary-glow);
		}
	}
</style>
