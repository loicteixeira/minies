<script lang="ts">
	import { type LucideProps } from '@lucide/svelte';
	import { History } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';

	import { resolve } from '$app/paths';

	import { ThemeSwitcher } from './ThemeSwitcher';
	import ThemeInitScript from './ThemeSwitcher/ThemeInitScript.svelte';

	type Props = {
		appName: string;
		appSubtitle?: string;
		appIcon: Component<LucideProps>;
		menuItems?: Snippet;
		showChangelog?: boolean;
	};
	const {
		appName,
		appSubtitle,
		appIcon: AppIcon,
		menuItems,
		showChangelog = true,
	}: Props = $props();
</script>

<ThemeInitScript />

<header class="border-base-100 mb-8 border-b">
	<nav class="navbar flex-col justify-between gap-4 px-5 md:flex-row">
		<div class="navbar-start w-auto gap-2">
			<span
				class="bg-primary/10 text-primary inline-flex aspect-square items-center justify-center rounded-lg p-2"
			>
				<AppIcon />
			</span>
			<h1>
				<a
					href={resolve('/')}
					title="Home"
					class="text-base-content inline-flex flex-col text-xl leading-tight font-bold"
				>
					<span>{appName}</span>
					{#if appSubtitle}<small class="text-base-content/60 text-sm font-normal"
							>{appSubtitle}</small
						>{/if}
				</a>
			</h1>
		</div>
		<div class="navbar-end w-auto justify-center gap-4 md:justify-end">
			{#if menuItems}
				{@render menuItems()}
			{/if}
			<div class="inline-flex gap-8 ps-4">
				{#if showChangelog}
					<a
						class="hover:text-primary tooltip tooltip-bottom"
						data-tip="Changelog"
						href="/changelog"><History size="18" /></a
					>
				{/if}
				<ThemeSwitcher />
			</div>
		</div>
	</nav>
</header>
