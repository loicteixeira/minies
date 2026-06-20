<script lang="ts">
	import { Trash2 } from '@lucide/svelte';

	type Props = {
		caption?: string;
		disabledText?: string;
		file: File | null;
		title: string;
	};
	let { caption, disabledText, file = $bindable(), title }: Props = $props();

	let isDragging = $state(false);

	let preview = $derived(file ? URL.createObjectURL(file) : null);

	function onChange(event: Event) {
		event.preventDefault();

		const input = event.target as HTMLInputElement;
		file = input.files?.[0] ?? null;
	}

	function onDelete(event: Event) {
		event.preventDefault();

		file = null;
	}

	function onDragEnter(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function onDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function onDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
	}

	function onDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;

		const dt = event.dataTransfer;
		const droppedFile = dt?.files?.[0] ?? null;
		if (droppedFile && droppedFile.type.startsWith('image/')) {
			file = droppedFile;
		}
	}
</script>

<div class="flex w-48 flex-col gap-2">
	<div>
		<div class="flex items-center justify-between gap-1">
			<p class="text-lg font-medium">{title}</p>
			{#if preview && !disabledText}
				<button class="hover:text-error" name="Remove main image" onclick={onDelete}>
					<Trash2 size={18} />
				</button>
			{/if}
		</div>
		{#if caption}
			<p class="text-base-content/60 text-sm">{caption}</p>
		{/if}
	</div>
	<div class="relative h-48 w-48">
		{#if disabledText}
			<div
				class="cursor absolute inset-0 flex cursor-not-allowed items-center justify-center rounded-md border-2 border-dashed border-red-300 bg-red-50 p-4 text-center text-red-600"
			>
				{disabledText}
			</div>
		{:else if preview}
			<div
				aria-label="Drop an image to replace the current preview"
				class={[
					'h-full w-full p-2',
					'flex items-center justify-center text-center',
					'text-primary-content/70 hover:text-primary-content',
					'rounded-md border-2 border-dashed hover:bg-gray-200',
					'focus-within:border-blue-500 focus-within:bg-blue-50',
					isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-500 bg-gray-100',
				]}
				ondragenter={onDragEnter}
				ondragover={onDragOver}
				ondragleave={onDragLeave}
				ondrop={onDrop}
				role="button"
				tabindex="0"
			>
				<img src={preview} alt="Preview" class="pointer-events-none max-h-full object-contain" />
			</div>
		{:else}
			<label
				class={[
					'h-full w-full p-2',
					'flex items-center justify-center text-center',
					'text-primary-content/70 hover:text-primary-content',
					'rounded-md border-2 border-dashed hover:bg-gray-200',
					'focus-within:border-blue-500 focus-within:bg-blue-50',
					isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-500 bg-gray-100',
				]}
				ondragenter={onDragEnter}
				ondragover={onDragOver}
				ondragleave={onDragLeave}
				ondrop={onDrop}
			>
				Click or drag a file here to upload.
				<input type="file" accept="image/*" class="hidden" onchange={onChange} />
			</label>
		{/if}
	</div>
</div>
