<script lang="ts">
	import type { ComputeFlatResultsOutput } from '$lib/compute';
	import type { CurrencyCode } from '$lib/types';

	import ResultsCell from '../Shared/Results/ResultsCell.svelte';

	type Props = ComputeFlatResultsOutput & { currencyCode: CurrencyCode };
	let { columns, currencyCode, rows }: Props = $props();
	let columnIds = $derived(
		columns.flatMap((column) => column.children?.map((child) => child.id) ?? column.id),
	);
</script>

<div class="overflow-x-auto rounded border border-gray-300">
	<table class="table-auto border-inherit">
		<thead
			class="text-md bg-base-200 border-inherit text-center align-text-top tracking-wide uppercase"
		>
			<tr class="border-inherit">
				{#each columns as column (column.id)}
					<th
						class={['border-inherit px-4 py-3 not-last:border-e', !column.children && 'border-b ']}
						colspan={column.children ? column.children.length : 1}
						rowspan={column.children ? 1 : 2}
					>
						{column.label}
					</th>
				{/each}
			</tr>
			<tr class="border-inherit">
				{#each columns as column (`sub-${column.id}`)}
					{#if column.children}
						{#each column.children as subColumn, subColumnIdx (`sub-${column.id}-${subColumnIdx}`)}
							<th class="border border-inherit px-4 py-3">{subColumn.label}</th>
						{/each}
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody class="border-inherit">
			{#each rows as row, rowIndex (rowIndex)}
				<tr class="border-b border-inherit">
					{#each row as { extra, type, value, warning }, cellIndex (`${rowIndex}-${cellIndex}`)}
						<ResultsCell
							{extra}
							{type}
							{value}
							{warning}
							id={columnIds[cellIndex]}
							{currencyCode}
						/>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
