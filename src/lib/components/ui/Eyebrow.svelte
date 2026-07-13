<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		prefix = '//',
		class: className = '',
		children,
		...rest
	}: {
		prefix?: string;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<p class={['bfd-eyebrow', className].filter(Boolean).join(' ')} {...rest}>
	{#if prefix}<span class="bfd-eyebrow__prefix">{prefix}</span>{/if}
	{@render children?.()}
</p>

<style>
	.bfd-eyebrow {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--font-size-small);
		letter-spacing: var(--tracking-label);
		color: var(--primary-teal-bright, var(--primary-blue-bright));
		margin: 0 0 var(--spacing-sm);
	}
	.bfd-eyebrow__prefix {
		opacity: 0.7;
		margin-right: 0.5ch;
	}
</style>
