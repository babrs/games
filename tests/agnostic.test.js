import { test } from 'node:test';
import assert from 'node:assert/strict';
import phaseShort from '../src/lib/agnostic/js/phaseShort/index.js';
import phaseSpeechText from '../src/lib/agnostic/js/phaseSpeechText/index.js';
import phaseActionInfo from '../src/lib/agnostic/js/phaseActionInfo/index.js';
import buildPhases from '../src/lib/agnostic/js/buildPhases/index.js';
import roleMeta from '../src/lib/agnostic/js/roleMeta/index.js';
import badgeMeta from '../src/lib/agnostic/js/badgeMeta/index.js';
import mafiaBaikal from '../src/lib/content/mafiaBaikal/index.js';

test('фазы ночи и дня переводятся в короткие подписи', () => {
	assert.equal(phaseShort('predators'), 'Ночь');
	assert.equal(phaseShort('morning'), 'Утро');
	assert.equal(phaseShort('day'), 'День');
	assert.equal(phaseShort('unknown'), 'unknown');
});

test('текст для ведущего учитывает Сову', () => {
	assert.match(phaseSpeechText('predators', true), /и Сова/);
	assert.doesNotMatch(phaseSpeechText('predators', false), /Сова/);
	assert.equal(phaseSpeechText('none', false), '');
});

test('подписи действий возвращают пустой объект для неизвестной фазы', () => {
	assert.equal(phaseActionInfo('gammarus').cls, 'clean');
	assert.deepEqual(phaseActionInfo('none'), { text: '', badge: '', cls: '', badgeKey: null });
});

test('порядок фаз включает только выбранные особые роли', () => {
	assert.deepEqual(buildPhases({ specials: { spirit: false, eagle: false, fox: false, gammarus: false, angara: false } }), [
		'predators',
		'morning',
		'day'
	]);
	assert.deepEqual(buildPhases({ specials: { spirit: true, eagle: false, fox: true, gammarus: true, angara: false } }), [
		'predators',
		'spirit',
		'fox',
		'gammarus',
		'morning',
		'day'
	]);
});

test('у всех ролей есть подпись и фракция', () => {
	for (const [key, meta] of Object.entries(roleMeta)) {
		assert.ok(meta.label, `роль ${key} без подписи`);
		assert.ok(meta.faction, `роль ${key} без фракции`);
	}
	assert.ok(badgeMeta.exile.text);
});

test('персонажи Байкальской мафии: 18 уникальных карточек, 7 мирных, 4 хищника, 7 особых', () => {
	const ids = mafiaBaikal.characters.map((character) => character.id);
	assert.equal(ids.length, 18);
	assert.equal(new Set(ids).size, 18);
	const byTeam = mafiaBaikal.characters.reduce((acc, character) => {
		acc[character.team] = (acc[character.team] ?? 0) + 1;
		return acc;
	}, {});
	assert.deepEqual(byTeam, { peaceful: 7, predator: 4, special: 7 });
});
