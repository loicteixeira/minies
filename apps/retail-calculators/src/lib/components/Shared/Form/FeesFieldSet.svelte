<script lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';

	import type { RetailFormState } from '$lib/types';

	import FieldSet from '../../Atoms/FieldSet.svelte';

	type Props = Pick<RetailFormState, 'fees'> &
		Pick<HTMLFieldsetAttributes, 'class'> & { currencySymbol: string };
	let { currencySymbol, fees = $bindable(), class: extraClass }: Props = $props();

	function addFee() {
		fees.push({
			amount: 0,
			key: crypto.randomUUID(),
			name: '',
			type: 'flat',
		});
	}

	function removeFee(index: number) {
		fees.splice(index, 1);
	}
</script>

<FieldSet class=" {extraClass}" title="Fees">
	<table class="w-full table-auto">
		<thead>
			<tr class="h-[2.3rem] text-left align-text-top uppercase">
				<th class="px-2" id="fee-name">Name</th>
				<th class="px-2" id="fee-amount">Amount</th>
				<th class="px-2" colspan="2" id="fee-type">Type</th>
			</tr>
		</thead>
		<tbody>
			{#each fees as fee, index (fee.key)}
				<tr>
					<td class="px-2 py-1.5">
						<input
							aria-labelledby="fee-name"
							class="input w-full focus:ring-0"
							id="fee-{fee.key}-name"
							type="text"
							bind:value={fee.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<input
							aria-labelledby="fee-amount"
							class="input w-[9ch] focus:ring-0"
							id="fee-{fee.key}-amount"
							type="text"
							inputmode="numeric"
							bind:value={fee.amount}
						/>
					</td>
					<td class="px-2 py-1.5">
						<select
							aria-labelledby="fee-type"
							class="select mt-1 block w-[9ch] rounded"
							id="fee-{fee.key}-type"
							bind:value={fee.type}
						>
							<option value="flat" selected={fee.type == 'flat'}>{currencySymbol}</option>
							<option value="percent" selected={fee.type == 'percent'}>%</option>
						</select>
					</td>
					<td class="py-1.5">
						<button
							class="btn btn-ghost btn-sm"
							title="Delete fee #{index + 1} ({fee.name})"
							onclick={() => removeFee(index)}
						>
							<span class="text-xs" aria-hidden="true">╳</span>
						</button>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="5" class="p-3 text-center">
					<button class="btn btn-ghost btn-primary" onclick={addFee}>+ Add Fee</button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
