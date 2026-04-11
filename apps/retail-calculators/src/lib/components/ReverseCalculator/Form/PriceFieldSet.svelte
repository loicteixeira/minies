<script lang="ts">
	import type { ReverseFormState } from '$lib/types';

	import FieldSet from '../../Atoms/FieldSet.svelte';

	type Props = Pick<ReverseFormState, 'salePrice'> & { currencySymbol: string };
	let { currencySymbol, salePrice = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-row flex-wrap gap-4" title="Product Information">
	<label>
		Sale Price
		<div class="input">
			<input
				aria-labelledby="scenario-listing-price"
				class="px-0 focus:ring-0"
				id="unit-cost"
				type="text"
				inputmode="numeric"
				bind:value={salePrice}
			/>
			<span>{currencySymbol}</span>
		</div>
	</label>
</FieldSet>
