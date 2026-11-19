/**
 * @param {{ specials: Record<string, boolean> }} config
 * @returns {string[]}
 */
export default function buildPhases(config) {
	const phases = ['predators'];
	if (config.specials.spirit) phases.push('spirit');
	if (config.specials.eagle) phases.push('eagle');
	if (config.specials.fox) phases.push('fox');
	if (config.specials.gammarus) phases.push('gammarus');
	if (config.specials.angara) phases.push('angara');
	phases.push('morning');
	phases.push('day');
	return phases;
}
