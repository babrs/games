import { base } from '$app/paths';
import mafiaBaikal from '$lib/content/mafiaBaikal/index.js';

export const prerender = true;

const teamLabels = {
	peaceful: 'Мирный',
	predator: 'Хищник',
	special: 'Особая роль'
};

export function load() {
	return {
		game: {
			...mafiaBaikal,
			image: `${base}${mafiaBaikal.image}`,
			characters: mafiaBaikal.characters.map((character) => ({
				...character,
				image: `${base}/images/mafia/baikal/characters/${character.id}.webp`,
				teamLabel: teamLabels[character.team]
			}))
		}
	};
}
