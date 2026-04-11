<script lang="ts">
	import type { RetailFormState } from '$lib/types';

	import FieldSet from '../../Atoms/FieldSet.svelte';

	type Props = Pick<RetailFormState, 'orderCount' | 'unitCost'> & { currencySymbol: string };
	let { currencySymbol, orderCount = $bindable(), unitCost = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-row flex-wrap gap-4" title="Product Information">
	<label class="block w-32">
		Unit Cost
		<div class="input">
			<input
				class="px-0 focus:ring-0"
				id="unit-cost"
				type="text"
				inputmode="numeric"
				bind:value={unitCost}
			/>
			<span>{currencySymbol}</span>
		</div>
	</label>

	<label class="block w-24">
		Order Count
		<input class="input" id="order-count" type="text" inputmode="numeric" bind:value={orderCount} />
	</label>
</FieldSet>
