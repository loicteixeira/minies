<script lang="ts">
	import '@minies/common/styles.css';

	import { Square } from '@lucide/svelte';
	import { SiteHeader } from '@minies/common/components';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const menuLinks = [{ text: 'Tool', url: '/tool' }] as const;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteHeader
	appIcon={Square}
	appName="Squarerizer"
	appSubtitle="Crop tall/wide artwork into squares~ish"
>
	{#snippet menuItems()}
		{#each menuLinks as { text, url } (text)}
			<a href={resolve(url)} class={['link-hover', page.url.pathname === url && 'text-primary']}
				>{text}</a
			>
		{/each}
	{/snippet}
</SiteHeader>

{@render children()}
