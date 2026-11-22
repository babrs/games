export function outsideClick(onoutside, { ignore } = {}) {
	return (node) => {
		const handle = (event) => {
			const { target } = event;
			if (node.contains(target)) return;
			if (ignore && target instanceof Element && target.closest(ignore)) return;
			onoutside();
		};

		document.addEventListener('click', handle, true);
		return () => document.removeEventListener('click', handle, true);
	};
}
