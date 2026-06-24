<script lang="ts">
	import { FAQ } from '@minies/common/components';

	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Retail Calculators</title>
	<meta
		name="description"
		content="More info & Frequently asked questions about the Retail Price Calculator."
	/>
</svelte:head>

<div class="mb-8 flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
	<div class="prose surface mx-auto">
		A collections of calculators to help you with your pricing strategies:
		<ul>
			<li>
				<a href={resolve('/retail')} class="link text-primary">Retail</a>, to help you decide how to
				price your products, taking into account a base price, bundles options and various fees.
			</li>
			<li>
				<a href={resolve('/reverse')} class="link text-primary">Reverse</a>, to help you understand
				how much money you have left after deducting various fees.
			</li>
		</ul>
	</div>

	<FAQ />
</div>
