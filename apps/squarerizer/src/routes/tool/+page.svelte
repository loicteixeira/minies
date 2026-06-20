<script lang="ts">
	import {
		type BackgroundOptions,
		Canvas,
		defaultBackgroundOptions,
		defaultForegroundOptions,
	} from '$lib/components/canvas';
	import {
		defaultGeneralOptions,
		defaultWatermarkOptions,
	} from '$lib/components/canvas/canvas-builder';
	import type { GeneralOptions, WatermarkOptions } from '$lib/components/canvas/canvas-types';
	import FileDropZone from '$lib/components/FileDropZone.svelte';
	import { useLocalStorage } from '$lib/useLocalStorage.svelte';

	const BACKGROUND_SCALE_VALUES = [
		...Array.from({ length: 9 }, (_v: number, index: number) => 1 / (index + 2)).reverse(),
		1,
		2,
		3,
	];
	const WATERMARK_OPACITY_VALUES = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
	const WATERMARK_SCALE_VALUES = [
		...Array.from({ length: 39 }, (_v: number, index: number) => 1 / (index + 2)).reverse(),
		1,
		2,
		3,
	];
	const WATERMARK_POSITIONS = [
		{ value: 'top-left', label: 'Top Left' },
		{ value: 'top-right', label: 'Top Right' },
		{ value: 'bottom-left', label: 'Bottom Left' },
		{ value: 'bottom-right', label: 'Bottom Right' },
	];

	let backgroundImageFile = $state<File | null>(null);
	let backgroundOptions = useLocalStorage<BackgroundOptions>(
		'squarerizer-background-options',
		defaultBackgroundOptions,
	);
	let generalOptions = useLocalStorage<GeneralOptions>(
		'squarerizer-general-options',
		defaultGeneralOptions,
	);
	let foregroundImageFile = $state<File | null>(null);
	let watermarkImageFile = $state<File | null>(null);
	let watermarkOptions = useLocalStorage<WatermarkOptions>(
		'squarerizer-watermark-options',
		defaultWatermarkOptions,
	);

	let disabledBackgroundWarning = $derived(
		backgroundOptions.value.reuseForeground
			? 'Not applicable with “Reuse Foreground” option selected'
			: '',
	);
	let disableDownload = $derived(!foregroundImageFile && !backgroundImageFile);

	let mainCanvasRef: Canvas | null = null;
	let detailStartCanvasRef: Canvas | null = null;
	let detailCenterCanvasRef: Canvas | null = null;
	let detailEndCanvasRef: Canvas | null = null;

	function handleDownload(e: Event) {
		e.preventDefault();

		const now = new Date()
			.toISOString()
			.replace(/\.\d{3}Z$/, '')
			.replace(/[^\w]/g, '');

		downloadCanvas(mainCanvasRef, `${now}_0_full`);
		downloadCanvas(detailStartCanvasRef, `${now}_1_zoom_start`);
		downloadCanvas(detailCenterCanvasRef, `${now}_2_zoom_center`);
		downloadCanvas(detailEndCanvasRef, `${now}_3_zoom_end`);
	}

	function downloadCanvas(canvas: Canvas | null, filename: string) {
		if (!canvas) return;

		const url = canvas.getDataURL();
		if (!url) return;

		const a = document.createElement('a');
		a.href = url;
		a.download = `${filename}.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<div class="mx-auto mb-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
	<div class="mb-8 flex flex-col gap-2">
		<p class="text-lg font-medium">General Options</p>
		<fieldset class="flex gap-4">
			<legend class="float-left">Format:</legend>
			<label>
				<input
					class="radio radio-sm"
					type="radio"
					bind:group={generalOptions.value.format}
					value="1:1-1080x1080px"
				/>
				Square - 1080<small>x</small>1080 px
			</label>
			<label>
				<input
					class="radio radio-sm"
					type="radio"
					bind:group={generalOptions.value.format}
					value="4:5-1080x1350px"
				/>
				4:5 - 1080<small>x</small>1350 px
			</label>
		</fieldset>
	</div>
	<div class="mb-8 flex flex-wrap gap-24">
		<FileDropZone
			bind:file={foregroundImageFile}
			caption="Upload your full-sized tall or wide artwork."
			title="Foreground Image"
		/>
		<div class="flex gap-8">
			<FileDropZone
				bind:file={backgroundImageFile}
				caption="Optionally add a background to fill the first square crop."
				disabledText={disabledBackgroundWarning}
				title="Background Image"
			/>
			<div class="flex flex-col gap-2">
				<p class="text-lg font-medium">Background Options</p>
				<label class="relative mb-4 flex justify-between gap-4">
					Blur
					<div class="relative">
						<input
							class="range range-xs"
							id="input"
							type="range"
							min="0"
							max="16"
							step="2"
							bind:value={backgroundOptions.value.blur}
						/>
						<span class="text-base-content/60 absolute inset-s-0 -bottom-4 text-sm">0px</span>
						<span class="text-base-content/60 absolute inset-e-0 -bottom-4 text-sm">16px</span>
					</div>
				</label>
				<label class="mb-4 flex justify-between gap-4">
					Brightness
					<div class="relative">
						<input
							class="range range-xs"
							id="input"
							type="range"
							min="50"
							max="150"
							step="5"
							bind:value={backgroundOptions.value.brightness}
						/>
						<span class="text-base-content/60 absolute inset-s-0 -bottom-4 text-sm">-50%</span>
						<span class="text-base-content/60 absolute inset-e-0 -bottom-4 text-sm">+50%</span>
					</div>
				</label>
				<label class="flex justify-between gap-4">
					Repeat
					<input class="toggle" type="checkbox" bind:checked={backgroundOptions.value.repeat} />
				</label>
				<label class="flex justify-between gap-4">
					Reuse Foreground
					<input
						class="toggle"
						type="checkbox"
						bind:checked={backgroundOptions.value.reuseForeground}
					/>
				</label>
				<label class="relative mb-4 flex justify-between gap-4">
					Scale
					<div class="relative">
						<input
							class="range range-xs"
							id="input"
							type="range"
							min="0"
							max={BACKGROUND_SCALE_VALUES.length - 1}
							step="1"
							bind:value={
								() => BACKGROUND_SCALE_VALUES.findIndex((v) => v === backgroundOptions.value.scale),
								(v) => (backgroundOptions.value.scale = BACKGROUND_SCALE_VALUES[v])
							}
						/>
						<span class="text-base-content/60 absolute inset-s-0 -bottom-4 text-sm"
							>÷{1 / BACKGROUND_SCALE_VALUES[0]}</span
						>
						<span class="text-base-content/60 absolute inset-e-0 -bottom-4 text-sm"
							>x{BACKGROUND_SCALE_VALUES[BACKGROUND_SCALE_VALUES.length - 1]}</span
						>
					</div>
				</label>
			</div>
		</div>
		<div class="flex gap-8">
			<FileDropZone
				bind:file={watermarkImageFile}
				caption="Optionally add a watermark to each image."
				title="Watermark Image"
			/>
			<div class="flex flex-col gap-2">
				<p class="text-lg font-medium">Watermark Options</p>
				<label class="relative mb-4 flex justify-between gap-4">
					Opacity
					<div class="relative">
						<input
							class="range range-xs"
							id="input"
							type="range"
							min="0"
							max={WATERMARK_OPACITY_VALUES.length - 1}
							step="1"
							bind:value={
								() =>
									WATERMARK_OPACITY_VALUES.findIndex((v) => v === watermarkOptions.value.opacity),
								(v) => (watermarkOptions.value.opacity = WATERMARK_OPACITY_VALUES[v])
							}
						/>
						<span class="text-base-content/60 absolute inset-s-0 -bottom-4 text-sm"
							>{WATERMARK_OPACITY_VALUES[0] * 100}%</span
						>
						<span class="text-base-content/60 absolute inset-e-0 -bottom-4 text-sm"
							>{WATERMARK_OPACITY_VALUES[WATERMARK_OPACITY_VALUES.length - 1] * 100}%</span
						>
					</div>
				</label>
				<fieldset>
					<legend>Position</legend>
					<div class="ml-2 grid grid-cols-2">
						{#each WATERMARK_POSITIONS as { value, label } (value)}
							<label>
								<input
									class="radio radio-sm"
									type="radio"
									bind:group={watermarkOptions.value.position}
									{value}
								/>
								{label}
							</label>
						{/each}
					</div>
				</fieldset>
				<label class="relative mb-4 flex justify-between gap-4">
					Scale
					<div class="relative">
						<input
							class="range range-xs"
							id="input"
							type="range"
							min="0"
							max={WATERMARK_SCALE_VALUES.length - 1}
							step="1"
							bind:value={
								() => WATERMARK_SCALE_VALUES.findIndex((v) => v === watermarkOptions.value.scale),
								(v) => (watermarkOptions.value.scale = WATERMARK_SCALE_VALUES[v])
							}
						/>
						<span class="text-base-content/60 absolute inset-s-0 -bottom-4 text-sm"
							>÷{1 / WATERMARK_SCALE_VALUES[0]}</span
						>
						<span class="text-base-content/60 absolute inset-e-0 -bottom-4 text-sm"
							>x{WATERMARK_SCALE_VALUES[WATERMARK_SCALE_VALUES.length - 1]}</span
						>
					</div>
				</label>
			</div>
		</div>
	</div>

	<div class="flex w-[560px] flex-col gap-4">
		<div>
			<Canvas
				background={{ file: backgroundImageFile, options: { ...backgroundOptions.value } }}
				foreground={{ file: foregroundImageFile, options: defaultForegroundOptions }}
				generalOptions={generalOptions.value}
				watermark={{ file: watermarkImageFile, options: { ...watermarkOptions.value } }}
				scale={1 / 2}
				caption="Original artwork with background fill"
				bind:this={mainCanvasRef}
			/>
		</div>
		<div class="flex gap-2">
			<Canvas
				foreground={{
					file: foregroundImageFile,
					options: { allowRotation: true, mode: 'cover', position: 'start' },
				}}
				generalOptions={generalOptions.value}
				watermark={{ file: watermarkImageFile, options: { ...watermarkOptions.value } }}
				scale={1 / 6}
				caption="Zoom-in crop of one side"
				bind:this={detailStartCanvasRef}
			/>
			<Canvas
				foreground={{
					file: foregroundImageFile,
					options: { allowRotation: true, mode: 'cover', position: 'center' },
				}}
				generalOptions={generalOptions.value}
				watermark={{ file: watermarkImageFile, options: { ...watermarkOptions.value } }}
				scale={1 / 6}
				caption="Zoom-in crop of center"
				bind:this={detailCenterCanvasRef}
			/>
			<Canvas
				foreground={{
					file: foregroundImageFile,
					options: { allowRotation: true, mode: 'cover', position: 'end' },
				}}
				generalOptions={generalOptions.value}
				watermark={{ file: watermarkImageFile, options: { ...watermarkOptions.value } }}
				scale={1 / 6}
				caption="Zoom-in crop of other side"
				bind:this={detailEndCanvasRef}
			/>
		</div>

		<div class="flex flex-col items-end gap-1">
			<button
				type="button"
				class="btn btn-primary"
				onclick={handleDownload}
				disabled={disableDownload}>Download All</button
			>
			<p class="text-base-content/60 w-3xs text-right text-sm">
				Your browser may prompt you for permission to download multiple files.
			</p>
		</div>
	</div>
</div>
