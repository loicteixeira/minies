<script lang="ts">
	import { FAQ } from '@minies/common/components';

	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Squarerizer</title>
	<meta name="description" content="More info & Frequently asked questions about Squarerizer." />
</svelte:head>

<div class="mb-8 flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
	<div class="prose surface mx-auto">
		Crop your tall or wide artwork and photos into a series of square-ish images, perfect for
		Instagram and other social media! Works best on desktop or large screens.
		<p><a href={resolve('/tool')} class="link text-primary">Use it now →</a></p>
	</div>

	<FAQ />
</div>
