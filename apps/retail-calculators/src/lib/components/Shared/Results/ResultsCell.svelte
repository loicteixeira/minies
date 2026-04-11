<script lang="ts">
	import type { ResultsRow } from '$lib/compute';
	import { formatCurrency, formatPercent } from '$lib/i18n';
	import type { CurrencyCode } from '$lib/types';

	type Props = ResultsRow & { currencyCode: CurrencyCode; odd?: boolean; id: string };
	let { currencyCode, extra, id, odd, type, value, warning }: Props = $props();

	let formattedValue = $derived.by(() => {
		let output;
		switch (type) {
			case 'number':
			case 'text':
				output = value?.toString();
				break;
			case 'currency':
				output =
					value && typeof value === 'number'
						? formatCurrency(value, currencyCode)
						: value?.toString();
				break;
			case 'percent':
				output = value && typeof value === 'number' ? formatPercent(value) : value?.toString();
				break;
		}
		return output ?? '–';
	});
</script>

<td
	class={[
		'break-normal',
		'border-inherit px-4 py-3 not-last:border-e',
		['currency', 'number', 'percent'].includes(type) && 'text-right',
		odd && 'bg-base-200',
		id === 'fees' && 'text-rose-800 dark:text-rose-500',
		id === 'fees-total' && 'font-bold text-rose-800 dark:text-rose-500',
		id === 'net' && 'font-bold text-emerald-800 dark:text-lime-500',
		extra && 'leading-none',
	]}
>
	<span
		class={[
			warning &&
				'cursor-help underline decoration-rose-800 decoration-wavy decoration-1 dark:decoration-rose-500',
		]}
		title={warning ? warning : ''}
	>
		{formattedValue}
		{#if extra}<small class="whitespace-nowrap">{extra}</small>{/if}
	</span>
</td>
