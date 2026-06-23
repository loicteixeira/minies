<script lang="ts">
	import { Bug, OctagonAlert, Sparkles, TrendingUp } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	import { assertNever } from '../../utils';
	import type { ChangelogTag } from './types';

	type Props = {
		children: Snippet;
		tag: ChangelogTag;
	};
	const { children, tag }: Props = $props();

	const {
		classes,
		icon: Icon,
		label,
	} = $derived.by(() => {
		switch (tag) {
			case 'break':
				return {
					classes: 'bg-error/10 text-error',
					icon: OctagonAlert,
					label: 'Breaking change',
				};
			case 'feature':
				return {
					classes: 'bg-primary/10 text-primary',
					icon: Sparkles,
					label: 'Feature',
				};
			case 'fix':
				return {
					classes: 'bg-warning/10 text-warning',
					icon: Bug,
					label: 'Fix',
				};
			case 'improvement':
				return {
					classes: 'bg-success/10 text-success',
					icon: TrendingUp,
					label: 'Improvement',
				};
			default:
				return assertNever(tag);
		}
	});
</script>

<div class="flex items-start gap-2.5">
	<div class="tooltip tooltip-left" data-tip={label}>
		<div class={['flex size-6 shrink-0 items-center justify-center rounded-full', classes]}>
			<Icon size={13} />
		</div>
	</div>
	<div class="text-base-content/80 flex-1 leading-relaxed">
		{@render children()}
	</div>
</div>
