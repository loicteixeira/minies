<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		date: string;
		children: Snippet;
	};

	const { date, children }: Props = $props();

	const dateFormatter = new Intl.DateTimeFormat(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const formattedDate = $derived(dateFormatter.format(new Date(date)));
</script>

<div class="group flex gap-4">
	<!-- Timeline graphic -->
	<div class="flex flex-col items-center">
		<div class="flex h-6 shrink-0 items-center">
			<div
				class={[
					'bg-base-content/30 size-2.5 rounded-full transition-colors',
					'ring-base-100 ring-2',
					'group-hover:bg-primary group-hover:ring-primary/20',
					'group-has-[a:target]:bg-primary group-has-[a:target]:ring-primary/20',
				]}
			></div>
		</div>
		<div
			class={[
				'my-2 h-full w-px rounded-full',
				'from-base-content/10 bg-linear-to-b to-transparent',
			]}
		></div>
	</div>

	<!-- Content -->
	<div class="flex flex-1 flex-col gap-3">
		<a
			href="#{date}"
			id={date}
			class="text-base-content/50 hover:text-base-content/80 font-semibold transition-colors"
		>
			<time datetime={date}>{formattedDate}</time>
		</a>
		<div class="flex flex-col gap-3">
			{@render children()}
		</div>
	</div>
</div>
