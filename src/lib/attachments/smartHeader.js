export function smartHeader(node, { topOffset = 0 } = {}) {
	let lastScrollY = window.scrollY;
	let ticking = false;

	function update() {
		const currentY = window.scrollY;
		const headerHeight = node.offsetHeight || 72;

		if (currentY <= topOffset) {
			// На самом верху: абсолютно прозрачный, привязан к верху
			node.classList.remove('is-scrolled', 'is-hidden', 'is-sticky');
			node.style.transform = 'translateY(0)';
		} else if (currentY > lastScrollY && currentY > headerHeight) {
			// Скроллим вниз: скрываем хэдер за пределы экрана без резкой смены фона
			node.classList.add('is-hidden');
			node.classList.remove('is-sticky');
			node.style.transform = `translateY(-100%)`;
		} else if (currentY < lastScrollY) {
			// Скроллим вверх: показываем липкий хэдер со светлым фоном
			node.classList.add('is-sticky', 'is-scrolled');
			node.classList.remove('is-hidden');
			node.style.transform = 'translateY(0)';
		}

		lastScrollY = currentY;
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(update);
			ticking = true;
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	update();

	return {
		destroy() {
			window.removeEventListener('scroll', onScroll);
		}
	};
}

export default smartHeader;
