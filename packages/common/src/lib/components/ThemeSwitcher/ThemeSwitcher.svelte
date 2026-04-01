<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';

	import { ATTRIBUTE_KEY, handleThemeChange, LIGHT_THEME } from './constants.ts';

	let isLight = $state(false);

	onMount(() => {
		// TODO: Move too?
		isLight = document.documentElement.getAttribute(ATTRIBUTE_KEY) === LIGHT_THEME;
	});
</script>

<label class="swap swap-rotate hover:text-primary">
	<input
		type="checkbox"
		class="sr-only"
		value="lemonade"
		checked={isLight}
		onchange={handleThemeChange}
	/>

	<Sun size="18" class="swap-on" />
	<Moon size="18" class="swap-off" />
</label>
