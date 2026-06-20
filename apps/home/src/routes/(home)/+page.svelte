<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';

	import type { Project } from './+page';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Minies</title>
	<meta
		name="description"
		content="A collection of small, focused tools built to make everyday tasks a little less painful. Open source and free."
	/>
</svelte:head>

<main class="container mx-auto flex max-w-3xl flex-col gap-7">
	<div class="bg-base-200 border-base-300 flex flex-col gap-4 rounded-2xl border p-6">
		<p>
			A collection of small, focused tools built to make everyday tasks a little less painful.
			<a href="https://github.com/loicteixeira/minies" rel="external" class="link link-primary">
				Open source
			</a> and free.
		</p>
		<p>If you find these tools useful, please consider sharing them with others.</p>
	</div>

	<div class="bg-base-200 border-base-300 overflow-hidden rounded-2xl border">
		{#each data.projects as project (project.name)}
			{@render project_link(project)}
		{/each}
	</div>
</main>

{#snippet project_link({ description, name, icon: Icon, url }: Project)}
	<a
		href={url}
		rel="external"
		class="border-base-300 hover:bg-base-300 group flex items-start gap-4 p-6 transition-colors not-first:border-t"
	>
		<span class="bg-primary/10 text-primary mt-1 aspect-square w-10 shrink-0 rounded-lg p-2">
			<Icon />
		</span>
		<div class="inline-flex flex-1 flex-col gap-0">
			<h3 class="text-lg font-semibold">{name}</h3>
			<p class="text-base-content/60 max-w-md text-sm">
				{description}
			</p>
		</div>
		<ArrowRight size="28" class="text-base-content/40 group-hover:text-primary mt-1 shrink-0" />
	</a>
{/snippet}
