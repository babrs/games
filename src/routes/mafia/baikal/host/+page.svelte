<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { gameState } from '$lib/stores';
	import SetupScreen from './__components/SetupScreen/index.js';
	import GameScreen from './__components/GameScreen/index.js';
	import '$lib/css/mafiaHostTokens/mafiaHostTokens.css';

	onMount(() => {
		gameState.load();
	});
</script>

<svelte:head>
	<title>Ведущий — Байкальская мафия | Babrs Games</title>
	<meta name="description" content="Приложение ведущего для игры «Байкальская мафия». Работает без интернета после первого открытия." />
	<link rel="manifest" href="{base}/mafia/baikal/host/manifest.webmanifest" />
	<link rel="apple-touch-icon" href="{base}/mafia/baikal/host/icons/apple-touch-icon.png" />
	<meta name="theme-color" content="#fdf8f4" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-title" content="Мафия" />
</svelte:head>

<div class="app-root">
	{#if gameState.setup}
		<SetupScreen />
	{:else}
		<GameScreen />
	{/if}
</div>

<style>
	.app-root {
		display: flex;
		min-height: 70vh;
		max-width: 480px;
		margin: 0 auto;
		flex-direction: column;
		position: relative;
	}
</style>
