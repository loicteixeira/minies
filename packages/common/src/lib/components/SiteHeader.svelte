<script lang="ts">
	import { type LucideProps } from '@lucide/svelte';
	import type { Component } from 'svelte';

	import { resolve } from '$app/paths';

	import { ThemeSwitcher } from './ThemeSwitcher';
	import ThemeInitScript from './ThemeSwitcher/ThemeInitScript.svelte';

	type Props = {
		appName: string;
		appSubtitle?: string;
		appIcon: Component<LucideProps>;
	};
	const { appName, appSubtitle, appIcon: AppIcon }: Props = $props();
</script>

<ThemeInitScript />

<header class="border-base-100 border-b">
	<nav class="navbar px-5">
		<div class="navbar-start">
			<h1 class="flex items-center gap-2">
				<span
					class="bg-primary/10 text-primary inline-flex aspect-square items-center justify-center rounded-lg p-2"
				>
					<AppIcon />
				</span>
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
		<div class="navbar-end">
			<ThemeSwitcher />
		</div>
	</nav>
</header>
