<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Squarerizer</title>
	<meta name="description" content="More info & Frequently asked questions about Squarerizer." />
</svelte:head>

<div class="flex flex-col gap-8">
	<div class="prose surface mx-auto">
		Crop your tall or wide artwork and photos into a series of square-ish images, perfect for
		Instagram and other social media! Works best on desktop or large screens.
		<p><a href={resolve('/tool')} class="link text-primary">Use it now →</a></p>
	</div>

	<div class="prose mx-auto">
		<p><strong>Is my data safe?</strong></p>

		<p>
			The images you upload are never sent to any server;<br />Your personal data is never collected
			or used in any way while using this tool.<br />You don’t need to create an account or log in
			to use it.
		</p>

		<p>
			However, the options & settings is saved in your browser's local storage so you won't have to
			set everything up again the next time you use the tool. If you wish to delete the data, clear
			your browser cache for this site.
		</p>
	</div>
</div>
