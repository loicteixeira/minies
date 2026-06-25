<script lang="ts">
	import { formatCurrency } from '$lib/i18n';
	import type { RetailFormState } from '$lib/types';

	import FieldSet from '../../Atoms/FieldSet.svelte';

	type Props = Pick<RetailFormState, 'currencyCode' | 'unitCost' | 'scenarios'> & {
		currencySymbol: string;
	};
	let { currencyCode, currencySymbol, unitCost = 1, scenarios = $bindable() }: Props = $props();

	const suggestedWholesale = $derived(Math.round((unitCost ?? 0) * 3));
	const suggestedRetail = $derived(Math.round((unitCost ?? 0) * 6));

	function addScenario(name: string = '', baseListingPrice: number = 0) {
		scenarios.push({ baseListingPrice, key: crypto.randomUUID(), name });
	}

	function addOrUpdateScenario(name: string = '', baseListingPrice: number = 0) {
		const existingScenario = scenarios.find((scenario) => scenario.name === name);
		if (existingScenario) {
			existingScenario.baseListingPrice = baseListingPrice;
		} else {
			addScenario(name, baseListingPrice);
		}
	}

	function removeScenario(index: number) {
		scenarios.splice(index, 1);
	}
</script>

<FieldSet title="Scenarios">
	<table class="w-full table-auto">
		<thead>
			<tr class="text-left align-text-top uppercase">
				<th class="px-2" id="scenario-name">Name</th>
				<th colspan="2" class="px-2 leading-none" id="scenario-listing-price"> Listing Price </th>
			</tr>
		</thead>
		<tbody>
			{#each scenarios as scenario, index (scenario.key)}
				<tr>
					<td class="px-2 py-1.5">
						<input
							aria-labelledby="scenario-name"
							class="input w-[12ch]"
							id="scenario-{scenario.key}-name"
							type="text"
							bind:value={scenario.name}
						/>
					</td>
					<td class="px-2 py-1.5">
						<div class="input w-[10ch]">
							<input
								aria-labelledby="scenario-listing-price"
								class="px-0 focus:ring-0"
								id="scenario-{scenario.key}-baseListingPrice"
								type="text"
								inputmode="numeric"
								bind:value={scenario.baseListingPrice}
							/>
							<span>{currencySymbol}</span>
						</div>
					</td>
					<td class="py-1.5">
						<button
							class="btn btn-ghost btn-sm"
							title="Delete scenario '{scenario.name}'"
							onclick={() => removeScenario(index)}
						>
							<span class="text-xs" aria-hidden="true">╳</span>
						</button>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="3" class="p-3 text-center">
					<button class="btn btn-ghost btn-primary" onclick={() => addScenario()}
						>+ Add Scenario</button
					>
				</td>
			</tr>
			<tr>
				<td colspan="3" class="text-neutral-content text-center text-sm">
					<span class="inline-block py-1">Suggested:</span>
					<br />
					<button
						class="btn btn-ghost"
						onclick={() => addOrUpdateScenario('Wholesale', suggestedWholesale)}
					>
						Wholesale: {formatCurrency(suggestedWholesale, currencyCode)}
						<span class="text-xs">(x3 unit cost)</span>
					</button>
					<br />
					<button
						class="btn btn-ghost"
						onclick={() => addOrUpdateScenario('Retail', suggestedRetail)}
					>
						Retail: {formatCurrency(suggestedRetail, currencyCode)}
						<span class="text-xs">(x6 unit cost)</span>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</FieldSet>
