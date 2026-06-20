<script lang="ts">
	import 'context-filter-polyfill';

	import { RotateCcwSquare, RotateCwSquare } from '@lucide/svelte';

	import {
		createCanvas,
		defaultBackgroundOptions,
		defaultForegroundOptions,
		defaultWatermarkOptions,
	} from './canvas-builder';
	import {
		type BackgroundOptions,
		type ForegroundOptions,
		type GeneralOptions,
		type WatermarkOptions,
	} from './canvas-types';

	type Props = {
		background?: { file: File | null; options: BackgroundOptions };
		caption?: string;
		foreground: {
			file: File | null;
			options: Omit<ForegroundOptions, 'rotationInDegrees'> & { allowRotation?: boolean };
		};
		generalOptions: GeneralOptions;
		scale: number;
		watermark?: { file: File | null; options: WatermarkOptions };
	};

	let {
		background = { file: null, options: defaultBackgroundOptions },
		caption,
		foreground = { file: null, options: { ...defaultForegroundOptions, allowRotation: false } },
		generalOptions,
		scale,
		watermark = { file: null, options: defaultWatermarkOptions },
	}: Props = $props();

	let rotationInDegrees = $state<ForegroundOptions['rotationInDegrees']>(0 as const);

	let canvasRef: HTMLCanvasElement | null = null;

	let size = $derived.by(() => {
		switch (generalOptions.format) {
			case '1:1-1080x1080px':
				return { width: 1080, height: 1080 };
			case '4:5-1080x1350px':
			default:
				return { width: 1080, height: 1350 };
		}
	});

	export function getDataURL() {
		if (!canvasRef) return null;
		return canvasRef.toDataURL('image/png');
	}
</script>

<div class="flex flex-col items-center gap-1">
	{#if caption}
		<p class="text-base-content/60 text-center text-sm">{caption}</p>
	{/if}
	<div style="width: {size.width * scale}px; height: {size.height * scale}px; overflow: hidden;">
		<canvas
			bind:this={canvasRef}
			{@attach createCanvas({
				background: background.file,
				backgroundOptions: background.options,
				foreground: foreground.file,
				foregroundOptions: { ...foreground.options, rotationInDegrees: rotationInDegrees },
				size,
				watermark: watermark.file,
				watermarkOptions: watermark.options,
			})}
			width={size.width}
			height={size.height}
			style="transform: scale({scale}); transform-origin: top left;"
		></canvas>
	</div>

	{#if foreground.options.allowRotation}
		<div class="flex gap-4">
			<button
				class="btn btn-circle btn-ghost"
				title="Rotate left"
				type="button"
				onclick={() => (rotationInDegrees = (rotationInDegrees! - 90) % 360)}
				><RotateCcwSquare size={18} /></button
			>
			<button
				class="btn btn-square btn-ghost"
				title="Rotate right"
				type="button"
				onclick={() => (rotationInDegrees = (rotationInDegrees! + 90) % 360)}
				><RotateCwSquare size={18} /></button
			>
		</div>
	{/if}
</div>
