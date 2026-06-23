<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';

	import { ATTRIBUTE_KEY, handleThemeChange, LIGHT_THEME } from './constants.ts';

	let isLight = $state(false);

	onMount(() => {
		isLight = document.documentElement.getAttribute(ATTRIBUTE_KEY) === LIGHT_THEME;
	});
</script>

<div class="tooltip tooltip-bottom lg:tooltip-left flex-center flex">
	<div class="tooltip-content">
		{#if isLight}
			Light theme on.<br />Click to switch to dark theme.
		{:else}
			Dark theme on.<br />Click to switch to light theme.
		{/if}
	</div>
	<label class="swap swap-rotate hover:text-primary">
		<input
			type="checkbox"
			class="sr-only"
			value="lemonade"
			bind:checked={isLight}
			onchange={handleThemeChange}
		/>

		<Sun size="18" class="swap-on" />
		<Moon size="18" class="swap-off" />
	</label>
</div>
