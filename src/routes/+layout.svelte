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

<SiteNav />
<main>
	{@render children()}
</main>
<SiteFooter />
