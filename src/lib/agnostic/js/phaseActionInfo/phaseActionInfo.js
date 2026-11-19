/**
 * @param {string} phase
 * @returns {{ text: string, badge: string, cls: string, badgeKey: string|null }}
 */
export default function phaseActionInfo(phase) {
	const map = {
		predators: { text: 'Жертва атаки', badge: 'Атака', cls: 'attack', badgeKey: 'attack' },
		spirit: { text: 'Защита', badge: 'Спасён', cls: 'protect', badgeKey: 'protect' },
		eagle: { text: 'Проверка', badge: 'Проверка', cls: 'check', badgeKey: 'check' },
		fox: { text: 'Молчание', badge: 'Молчит', cls: 'mute', badgeKey: 'mute' },
		gammarus: { text: 'Зачистка', badge: 'Зачистка', cls: 'clean', badgeKey: 'clean' },
		angara: { text: 'Дар', badge: 'Дар', cls: 'gift', badgeKey: 'gift' },
		day: { text: 'Изгнание', badge: 'Изгнан', cls: 'exile', badgeKey: 'exile' }
	};
	return map[phase] || { text: '', badge: '', cls: '', badgeKey: null };
}
