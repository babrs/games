/**
 * @param {string} phase
 * @returns {string}
 */
export default function phaseShort(phase) {
	const map = {
		predators: 'Ночь',
		spirit: 'Ночь',
		eagle: 'Ночь',
		fox: 'Ночь',
		gammarus: 'Ночь',
		angara: 'Ночь',
		morning: 'Утро',
		day: 'День'
	};
	return map[phase] || phase;
}
