<script lang="ts">
	import FieldSet from '../../Atoms/FieldSet.svelte';

	type Props = {
		onClearData: () => void;
		onDownload: () => void;
		onLoadDemoData: () => void;
	};
	let { onClearData, onDownload, onLoadDemoData }: Props = $props();
</script>

<FieldSet class="flex flex-row" title="Actions">
	<div class="flex flex-col gap-2">
		<button class="btn btn-ghost" onclick={onDownload}>Download as CSV</button>
	</div>
	<div class="mx-2 border-e border-dashed border-gray-300"></div>
	<div class="flex flex-col gap-2">
		<button class="btn btn-ghost" onclick={onLoadDemoData}>Load Demo Data</button>
		<button class="btn btn-error btn-ghost" onclick={onClearData}>Clear Calculator</button>
	</div>
</FieldSet>
