export function outsideClick(node, callback) {
	function handleClick(event) {
		if (node && !node.contains(event.target)) {
			callback();
		}
	}

	setTimeout(() => {
		document.addEventListener('click', handleClick, true);
	}, 0);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export default outsideClick;
