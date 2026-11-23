/**
 * @param {Object} [options]
 * @param {'top' | 'bottom'} [options.side='top'] - Сторона: верхняя шапка или нижняя панель
 * @param {number} [options.offset=100] - Отступ в px за границей экрана для активации
 * @param {number} [options.threshold=10] - Порог защиты от дребезга в px
 * @param {(node: HTMLElement) => void} [options.onPassOffset] - 1. Ушли за пределы отступа
 * @param {(node: HTMLElement) => void} [options.onReveal] - 2. Появление панели
 * @param {(node: HTMLElement) => void} [options.onRehide] - 3. Повторное скрытие панели
 * @param {(node: HTMLElement) => void} [options.onReset] - 4. Возврат на исходное место в потоке
 */
export function smartSticky(options = {}) {
	return (node) => {
		if (typeof window === 'undefined') return;

		const isTop = options.side !== 'bottom';
		const offset = options.offset ?? 100;
		const threshold = options.threshold ?? 10;

		let state = 'IDLE';
		let lastScrollY = window.scrollY;
		let directionAnchorY = window.scrollY;
		let initialTop = 0;
		let initialBottom = 0;
		let ticking = false;

		const updateInitialPosition = () => {
			const rect = node.getBoundingClientRect();
			initialTop = rect.top + window.scrollY;
			initialBottom = rect.bottom + window.scrollY;
		};

		updateInitialPosition();

		const resizeObserver = new ResizeObserver(() => {
			if (state === 'IDLE') updateInitialPosition();
		});
		resizeObserver.observe(document.body);

		const update = () => {
			ticking = false;
			const currentY = Math.max(0, window.scrollY);
			const vh = window.visualViewport?.height ?? window.innerHeight;

			// Граница сброса (возврат в поток) и граница активации (уход за экран)
			const isBackInFlow = isTop
				? currentY <= initialTop
				: currentY + vh >= initialBottom;

			const isPastOffset = isTop
				? currentY >= initialTop + offset
				: currentY + vh <= initialBottom - offset;

			// 4. Возврат в исходную точку в потоке (сброс цикла)
			if (state !== 'IDLE' && isBackInFlow) {
				state = 'IDLE';
				lastScrollY = currentY;
				directionAnchorY = currentY;
				options.onReset?.(node);
				return;
			}

			const isScrollingDown = currentY > lastScrollY;
			const isScrollingUp = currentY < lastScrollY;

			if (
				(isScrollingDown && lastScrollY < directionAnchorY) ||
				(isScrollingUp && lastScrollY > directionAnchorY)
			) {
				directionAnchorY = lastScrollY;
			}

			const deltaFromAnchor = Math.abs(currentY - directionAnchorY);

			// Для top: прячем при скролле вниз, показываем при скролле вверх
			// Для bottom: прячем при скролле вверх, показываем при скролле вниз
			const shouldReveal = isTop ? isScrollingUp : isScrollingDown;
			const shouldHide = isTop ? isScrollingDown : isScrollingUp;

			switch (state) {
				case 'IDLE':
					if (isPastOffset) {
						state = 'PASSED_OFFSET';
						directionAnchorY = currentY;
						options.onPassOffset?.(node);
					}
					break;

				case 'PASSED_OFFSET':
					if (shouldReveal && deltaFromAnchor >= threshold) {
						state = 'REVEALED';
						directionAnchorY = currentY;
						options.onReveal?.(node);
					}
					break;

				case 'REVEALED':
					if (shouldHide && deltaFromAnchor >= threshold) {
						state = 'REHIDDEN';
						directionAnchorY = currentY;
						options.onRehide?.(node);
					}
					break;

				case 'REHIDDEN':
					if (shouldReveal && deltaFromAnchor >= threshold) {
						state = 'REVEALED';
						directionAnchorY = currentY;
						options.onReveal?.(node);
					}
					break;
			}

			lastScrollY = currentY;
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		};

		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			resizeObserver.disconnect();
		};
	};
}
