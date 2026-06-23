<script lang="ts">
	import { Changelog, ChangelogChange, ChangelogEntry } from '@minies/common/components';
</script>

<svelte:head>
	<title>Changelog</title>
	<meta name="description" content="TODO" />
</svelte:head>

<div class="mx-auto mb-8 max-w-[65ch] px-4 sm:px-6 lg:px-8">
	<div class="prose mb-4"><h2>Changelog</h2></div>
	<Changelog>
		<ChangelogEntry date="2026-01-20">
			<ChangelogChange tag="feature">
				Squarerizer is now part of the <a class="link" href="https://minies.perfectdodges.com"
					>minies collection</a
				> 🎉
			</ChangelogChange>
			<ChangelogChange tag="fix">Fix layout on Firefox</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2026-01-07">
			<ChangelogChange tag="feature">Add 4:5 format option (Instagram new square)</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-12-25">
			<ChangelogChange tag="feature">Persist options to browser cache</ChangelogChange>
			<ChangelogChange tag="improvement">Add more watermark scaling options</ChangelogChange>
			<ChangelogChange tag="fix"
				>Accept new file via drag and drop when one is already present</ChangelogChange
			>
		</ChangelogEntry>

		<ChangelogEntry date="2025-11-16">
			<ChangelogChange tag="feature">Add watermark option</ChangelogChange>
			<ChangelogChange tag="feature">Allow rotating thumbnails</ChangelogChange>
			<ChangelogChange tag="fix">Scale pattern from the center of the canvas</ChangelogChange>
			<ChangelogChange tag="fix">Fix distortion in detail thumbnails</ChangelogChange>
			<ChangelogChange tag="fix">Fix file dropzone drag and drop</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-10-12">
			<ChangelogChange tag="feature">Generate detail thumbnails as well</ChangelogChange>
			<ChangelogChange tag="fix">Fix layout on wider screens</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-06-18">
			<ChangelogChange tag="feature">Add background scale option</ChangelogChange>
			<ChangelogChange tag="improvement"
				>Increase background brightness option range</ChangelogChange
			>
			<ChangelogChange tag="fix">Fix layout on Firefox</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-05-30">
			<ChangelogChange tag="feature">Initial Release</ChangelogChange>
		</ChangelogEntry>
	</Changelog>
</div>
