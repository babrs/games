<script>
	import { base } from '$app/paths';
	import { Button } from 'babrs-ui';
	import { HeroBanner } from '$lib/components';
</script>

<svelte:head>
	<title>Бабр Игры — настолки из Сибири</title>
	<meta name="description" content="Настольные игры с сибирским характером: Доббль Байкал и Байкальская мафия." />
</svelte:head>

<HeroBanner title="Настольные игры с характером Байкала" backgroundImage="{base}/images/dobble/baikal/hero-baikal.webp">
	<div class="hero-actions">
		<Button href="#catalog" variant="primary">Перейти в каталог</Button>
	</div>
</HeroBanner>

<div class="storefront">
	<section id="catalog" class="container section">
		<header class="section__header">
			<h2 class="section__title">Каталог игр</h2>
			<p class="section__subtitle">Игры для компании и всей семьи</p>
		</header>

		<div class="product-grid">
			<!-- Product 1 -->
			<article class="product-card">
				<div class="product-card__image-wrap">
					<!-- Абстрактный фон или плейсхолдер, пока нет финальных фото коробок -->
					<div class="product-card__image product-card__image_dobble"></div>
				</div>
				<div class="product-card__content">
					<h3 class="product-card__title">Добрый Доббль «Байкал»</h3>
					<p class="product-card__desc">57 уникальных символов Байкала: животные, знаковые места и легенды. Быстрая игра на внимание для всей семьи.</p>
					<div class="product-card__footer">
						<Button href="{base}/dobble/rules/" variant="primary">Правила игры</Button>
					</div>
					<div class="product-card__links">
						<a href="{base}/dobble/" class="product-card__link">Об игре и символах →</a>
					</div>
				</div>
			</article>

			<!-- Product 2 -->
			<article class="product-card">
				<div class="product-card__image-wrap">
					<!-- Абстрактный фон или плейсхолдер -->
					<div class="product-card__image product-card__image_mafia"></div>
				</div>
				<div class="product-card__content">
					<h3 class="product-card__title">Байкальская мафия</h3>
					<p class="product-card__desc">Психологическая игра в атмосферном сеттинге. Карточки персонажей, правила и приложение для ведущего.</p>
					<div class="product-card__footer">
						<Button href="{base}/mafia/baikal/rules/" variant="primary">Правила игры</Button>
					</div>
					<div class="product-card__links">
						<a href="{base}/mafia/baikal/" class="product-card__link">Об игре и персонажах →</a>
					</div>
				</div>
			</article>
		</div>
	</section>

	<section class="container section digital-bonus">
		<div class="digital-bonus__content">
			<h2 class="digital-bonus__title">Цифровые бонусы к играм</h2>
			<p class="digital-bonus__text">
				Каждая копия «Байкальской мафии» поставляется с бесплатным <strong>веб-приложением для ведущего</strong>. 
				Оно помогает распределять роли, следить за сменой дня и ночи, и работает без интернета прямо в браузере смартфона.
			</p>
			<div class="digital-bonus__actions">
				<Button href="{base}/mafia/baikal/host/" variant="outline">Попробовать приложение</Button>
			</div>
		</div>
	</section>

	<section class="container section upcoming">
		<header class="section__header">
			<h2 class="section__title">Новые игры</h2>
			<p class="section__subtitle">Работаем над следующими проектами</p>
		</header>
		<div class="upcoming__grid">
			<div class="upcoming-card">
				<h3 class="upcoming-card__title">Анонсы</h3>
				<p class="upcoming-card__desc">О новых играх расскажем, когда будет готово</p>
			</div>
		</div>
	</section>
</div>

<style>
	.hero-actions {
		margin-top: var(--space-md);
	}

	.storefront {
		padding-bottom: var(--space-2xl);
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
		padding-block: var(--space-xl);
	}

	.section__header {
		text-align: center;
		display: grid;
		gap: var(--space-xs);
	}

	.section__title {
		font-family: var(--font-display);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
	}

	.section__subtitle {
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
	}

	/* Storefront Grid */
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-xl);
	}

	.product-card {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-sm);
		overflow: hidden;
		transition: transform var(--duration-normal), box-shadow var(--duration-normal);
	}

	.product-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-md);
	}

	.product-card__image-wrap {
		position: relative;
		height: 260px;
		background: var(--color-bg-alt);
		border-bottom: 1px solid var(--color-border);
	}

	.product-card__image {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
	}

	.product-card__image_dobble {
		background-image: linear-gradient(135deg, rgba(255,140,0,0.1) 0%, rgba(255,20,147,0.1) 100%), radial-gradient(circle at 50% 50%, var(--color-primary-glow) 0%, transparent 60%);
	}

	.product-card__image_mafia {
		background-image: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(75,0,130,0.1) 100%), radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0%, transparent 60%);
	}

	.product-card__content {
		display: flex;
		flex-direction: column;
		padding: var(--space-lg);
		flex: 1;
		gap: var(--space-sm);
	}

	.product-card__title {
		font-family: var(--font-display);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		line-height: 1.2;
	}

	.product-card__desc {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		line-height: 1.5;
		margin-bottom: var(--space-md);
		flex: 1;
	}

	.product-card__footer {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding-top: var(--space-md);
		border-top: 1px dashed var(--color-border);
		margin-bottom: var(--space-md);
	}

	.product-card__links {
		display: flex;
		justify-content: center;
	}

	.product-card__link {
		font-size: var(--font-size-sm);
		color: var(--color-primary);
		text-decoration: none;
		font-weight: var(--font-weight-bold);
	}

	.product-card__link:hover {
		text-decoration: underline;
	}

	/* Digital Bonus */
	.digital-bonus {
		background: color-mix(in srgb, var(--color-surface) 90%, transparent);
		border-radius: var(--radius-2xl);
		padding: var(--space-2xl) var(--space-xl);
		text-align: center;
		border: 1px solid var(--color-border);
		margin-block: var(--space-xl);
	}

	.digital-bonus__title {
		font-family: var(--font-display);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--space-md);
	}

	.digital-bonus__text {
		color: var(--color-text-muted);
		font-size: var(--font-size-md);
		max-width: 60ch;
		margin: 0 auto var(--space-xl);
		line-height: 1.6;
	}

	/* Upcoming */
	.upcoming__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-md);
	}

	.upcoming-card {
		padding: var(--space-lg);
		background: color-mix(in srgb, var(--color-surface) 50%, transparent);
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-lg);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
	}

	.upcoming-card__title {
		font-weight: var(--font-weight-bold);
		font-size: var(--font-size-md);
	}

	.upcoming-card__desc {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}
</style>
