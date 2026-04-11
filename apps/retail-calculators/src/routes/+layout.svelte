<script lang="ts">
	import '@minies/common/styles.css';

	import { Calculator } from '@lucide/svelte';
	import { SiteHeader } from '@minies/common/components';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const menuLinks = [
		{ text: 'Retail', url: '/retail' },
		{ text: 'Reverse', url: '/reverse' },
	] as const;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteHeader
	appIcon={Calculator}
	appName="Retail Calculators"
	appSubtitle="Utilities for small business owners"
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
