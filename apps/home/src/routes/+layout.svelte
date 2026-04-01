<script lang="ts">
	import '@minies/common/styles.css';

	import { PencilRuler } from '@lucide/svelte';
	import { SiteHeader } from '@minies/common/components';

	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteHeader appIcon={PencilRuler} appName="Minies" appSubtitle="Utilities for everyday tasks" />

{@render children()}
