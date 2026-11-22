export function smartHeader(node, { topOffset = 0, hideAfter } = {}) {
	let lastY = window.scrollY;
	let frame = 0;

	function update() {
		frame = 0;
		const y = window.scrollY;
		const threshold = hideAfter ?? node.offsetHeight;

		if (y <= topOffset) {
			node.classList.remove('is-solid', 'is-hidden');
		} else if (y > lastY && y > threshold) {
			node.classList.remove('is-solid');
			node.classList.add('is-hidden');
		} else if (y < lastY) {
			node.classList.remove('is-hidden');
			node.classList.add('is-solid');
		}

		lastY = y;
	}

	function onScroll() {
		if (!frame) frame = requestAnimationFrame(update);
	}

	update();
	window.addEventListener('scroll', onScroll, { passive: true });

	return {
		destroy() {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(frame);
		}
	};
}

export default smartHeader;
