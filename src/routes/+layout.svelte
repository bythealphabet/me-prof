<script lang="ts">
	import '$lib/design-system/index.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteNav from '$lib/components/layout/SiteNav.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="main-layout base-grid">
	<SiteNav />
	<main class="base-grid">
		{@render children()}
	</main>
	<SiteFooter />
</div>

<style>
	:global(.main-header) {
		grid-column: 1/ -1;
		grid-row: 1;
	}

	main {
		grid-column: 1 / -1;
		grid-row: 2;
	}

	:global(.main-footer) {
		grid-column: 1/ -1;
		grid-row: 3;
	}
</style>
