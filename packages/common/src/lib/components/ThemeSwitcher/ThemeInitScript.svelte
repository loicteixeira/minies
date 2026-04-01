<script lang="ts">
	import { ATTRIBUTE_KEY, STORAGE_KEY, VALID_THEMES } from './constants.ts';

	const initScript = `
	try {
		const theme = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
		if( theme && ${JSON.stringify(VALID_THEMES)}.includes(theme)) {
			document.documentElement.setAttribute(${JSON.stringify(ATTRIBUTE_KEY)}, theme);
		};
	} catch(e) {};
	`;
</script>

<svelte:head>
	{@html `<script>${initScript}</script>`}
</svelte:head>
