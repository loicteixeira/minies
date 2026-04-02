import type { LucideProps } from '@lucide/svelte';
import { Calculator, Square } from '@lucide/svelte';
import type { Component } from 'svelte';

export type Project = {
	name: string;
	description: string;
	icon: Component<LucideProps>;
	url: string;
};

export function load() {
	return {
		projects: [
			{
				description: 'Calculate margins, markups, and break-even points.',
				name: 'Retail Calculators',
				icon: Calculator,
				url: 'https://retailcalculators.minies.perfectdodge.com',
			},
			{
				description:
					'Crop your tall or wide artwork and photos into a series of square-ish images, perfect for Instagram and other social media.',
				name: 'Squarerizer',
				icon: Square,
				url: 'https://squarerizer.minies.perfectdodge.com',
			},
		] satisfies Project[],
	};
}
