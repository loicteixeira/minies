<script lang="ts">
	import { CURRENCY_CODES } from '$lib/currencies';
	import type { RetailFormState } from '$lib/types';

	import FieldSet from '../../Atoms/FieldSet.svelte';

	type Props = Pick<RetailFormState, 'currencyCode'>;
	let { currencyCode = $bindable() }: Props = $props();
</script>

<FieldSet class="flex flex-col gap-4" title="Settings">
	<label class="block">
		Currency
		<select class="select mt-1 block w-32 rounded" id="currency-code" bind:value={currencyCode}>
			{#each CURRENCY_CODES as currency}
				<option value={currency}>{currency}</option>
			{/each}
		</select>
	</label>
</FieldSet>
