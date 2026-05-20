<script lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';

	import type { RetailFormState } from '$lib/types';

	import FieldSet from '../../Atoms/FieldSet.svelte';

	type Props = Pick<RetailFormState, 'bundles'> & Pick<HTMLFieldsetAttributes, 'class'>;
	let { bundles = $bindable(), class: extraClass }: Props = $props();

	function addBundle() {
		bundles.push({
			buyCount: 1,
			freeCount: 0,
			key: crypto.randomUUID(),
			name: '',
			rounding: null,
		});
	}

	function removeBundle(index: number) {
		bundles.splice(index, 1);
	}
</script>

<FieldSet class=" {extraClass}" title="Bundle Options">
	<table class="w-full table-auto">
		<thead>
			<tr class="text-left align-text-top uppercase">
				<th class="px-2" id="bundle-name">Name</th>
				<th class="px-2 leading-none" id="bundle-buy-count">
					Buy<br />
					<span class="text-[.4em]">count</span>
				</th>
				<th class="px-2 leading-none" id="bundle-free-count">
					Free<br />
					<span class="text-[.4em]">count</span>
				</th>
				<th colspan="2" class="px-2 leading-none" id="bundle-rounding">
					Rounding<br />
					<span class="text-[.4em]">down to nearest</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each bundles as bundle, index (bundle.key)}
				<tr>
					<td class="px-2 py-1.5">
						<input
							aria-labelledby="bundle-name"
							class="input"
							id="bundle-{bundle.key}-name"
							type="text"
							bind:value={bundle.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<input
							aria-labelledby="bundle-buy-count"
							class="input w-[7ch]"
							id="bundle-{bundle.key}-buyCount"
							type="text"
							inputmode="numeric"
							bind:value={bundle.buyCount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<input
							aria-labelledby="bundle-free-count"
							class="input w-[7ch]"
							id="bundle-{bundle.key}-freeCount"
							type="text"
							inputmode="numeric"
							bind:value={bundle.freeCount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<select
							aria-labelledby="bundle-rounding"
							class="select mt-1 block w-[9ch] rounded"
							id="bundle-{bundle.key}-rounding"
							bind:value={bundle.rounding}
						>
							<option value={null} aria-label="None"></option>
							<option value={0.1}>0.1</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={15}>15</option>
							<option value={20}>20</option>
							<option value={25}>25</option>
						</select></td
					>
					<td class="py-1.5">
						<button
							class="btn btn-ghost"
							title="Delete bundle #{index + 1} ({bundle.name})"
							onclick={() => removeBundle(index)}
						>
							<span class="text-xs" aria-hidden="true">╳</span>
						</button>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="5" class="p-3 text-center">
					<button class="btn btn-ghost btn-primary" onclick={addBundle}>+ Add Bundle</button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
