<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';

	import { ATTRIBUTE_KEY, handleThemeChange, LIGHT_THEME } from './constants.ts';

	let isLight = $state(false);
	let tooltipText = $derived(
		isLight
			? 'Light theme on. Click to switch to dark theme.'
			: 'Dark theme on. Click to switch to light theme.',
	);

	let { class: extraClasses }: { class?: string } = $props();

	onMount(() => {
		isLight = document.documentElement.getAttribute(ATTRIBUTE_KEY) === LIGHT_THEME;
	});
</script>

<label class={['swap swap-rotate hover:text-primary', extraClasses]} title={tooltipText}>
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
