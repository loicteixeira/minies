<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Retail Calculators</title>
	<meta
		name="description"
		content="More info & Frequently asked questions about the Retail Price Calculator."
	/>
</svelte:head>

<div class="flex flex-col gap-8">
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

	<div class="prose mx-auto">
		<p><strong>Is my data safe?</strong></p>

		<p>
			The values you enter in the calculator are never uploaded to any server;<br />Your personal
			data is never collected or used in any way while using this calculator.<br />You don’t need to
			create an account or log in to use it.
		</p>

		<p>
			However, the data is saved in your browser's local storage so you won't have to set everything
			up again the next time you use the calculator. If you wish to delete the data, either click
			the "Clear Calculator" action or clear your browser storage.
		</p>
	</div>
</div>
