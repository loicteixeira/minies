<script lang="ts">
	import type { ComputeGroupedResultsOutput } from '$lib/compute';
	import type { CurrencyCode } from '$lib/types';

	import ResultsCell from '../Shared/Results/ResultsCell.svelte';

	type Props = ComputeGroupedResultsOutput & { currencyCode: CurrencyCode };
	let { columns, currencyCode, groups }: Props = $props();
	let columnIds = $derived(
		columns.flatMap((column) => column.children?.map((child) => child.id) ?? column.id),
	);
</script>

<div class="overflow-x-auto rounded border">
	<table class="border-base-content table-auto">
		<thead
			class="text-md bg-base-300 border-inherit text-center align-text-top tracking-wide uppercase"
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
			{#each groups as group, groupIndex (`group-${groupIndex}`)}
				{@const oddGroup = groupIndex % 2}
				{@const oddFirstRow = (oddGroup * group.rows.length) % 2 === 1}
				<tr class="border-b border-inherit">
					<td
						class={['border-inherit px-4 py-3 not-last:border-e', oddGroup && 'bg-base-200']}
						rowspan={group.rows.length}
					>
						{group.label}
					</td>
					{#each group.rows[0] as { extra, type, value, warning }, cellIndex (`group-${groupIndex}-0-${cellIndex}`)}
						<ResultsCell
							{extra}
							{type}
							{value}
							{warning}
							odd={oddFirstRow}
							id={columnIds[cellIndex + 1]}
							{currencyCode}
						/>
					{/each}
				</tr>
				{#each group.rows.slice(1) as row, rowIndex (`group-${groupIndex}-${rowIndex}`)}
					{@const evenRow = (oddGroup * group.rows.length + rowIndex) % 2 === 0}
					<tr class={['border-inherit not-last:border-b', evenRow && 'bg-base-200']}>
						{#each row as { extra, type, value, warning }, cellIndex (`group-${groupIndex}-${rowIndex}-${cellIndex}`)}
							<ResultsCell
								{extra}
								{type}
								{value}
								{warning}
								id={columnIds[cellIndex + 1]}
								{currencyCode}
							/>
						{/each}
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>
</div>
