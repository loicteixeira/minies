<script lang="ts">
	import { Changelog, ChangelogChange, ChangelogEntry } from '@minies/common/components';

	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Changelog</title>
	<meta name="description" content="TODO" />
</svelte:head>

<div class="mx-auto mb-8 max-w-[65ch] px-4 sm:px-6 lg:px-8">
	<div class="prose mb-8"><h2>Changelog</h2></div>
	<Changelog>
		<ChangelogEntry date="2026-06-25">
			<ChangelogChange tag="improvement"
				>Explicit "no rounding" option instead of blank</ChangelogChange
			>
			<ChangelogChange tag="fix"
				>Shrank scenario, bundle and fee name inputs so all three blocks fix on the same line on
				smaller screens</ChangelogChange
			>
			<ChangelogChange tag="fix">Fix cell colors on reverse calculators</ChangelogChange>
		</ChangelogEntry>
		<ChangelogEntry date="2026-01-16">
			<ChangelogChange tag="feature">
				Retail Calculators is now part of the <a
					class="link"
					href="https://minies.perfectdodges.com">minies collection</a
				> 🎉
			</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-08-10">
			<ChangelogChange tag="feature">
				Add a <a class="link" href={resolve('/reverse')}>reverse price calculator</a>.
			</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-01-26">
			<ChangelogChange tag="feature"
				>Remember calculator state between visits and when changing pages.</ChangelogChange
			>
			<ChangelogChange tag="fix">Fix accessibility labelling of form fields.</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-01-25">
			<ChangelogChange tag="feature">Add CSV Export of the computed data.</ChangelogChange>
			<ChangelogChange tag="fix">Fix navigation display on small screens.</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-01-13">
			<ChangelogChange tag="improvement"
				>Rework warnings display and add a message on hover.</ChangelogChange
			>
			<ChangelogChange tag="improvement">Right align numbers in table.</ChangelogChange>
			<ChangelogChange tag="improvement">Highlight fees and net values in table.</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-01-12">
			<ChangelogChange tag="break"
				>Update the break even calculation. It now displays the total number of items needed to be
				sold to recoup costs, instead of the total number of sales of the given bundle.</ChangelogChange
			>
			<ChangelogChange tag="feature"
				>Add a warning for negative net &amp; margin, and break even value which exceeds the order
				count.</ChangelogChange
			>
			<ChangelogChange tag="improvement">Alternate row colors in results table.</ChangelogChange>
		</ChangelogEntry>

		<ChangelogEntry date="2025-01-11">
			<ChangelogChange tag="feature">Initial Release.</ChangelogChange>
		</ChangelogEntry>
	</Changelog>
</div>
