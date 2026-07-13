<script lang="ts">
	import type { Snippet } from 'svelte';

	type Size = 'h1' | 'h2' | 'h3';
	type Align = 'center' | 'left';

	let {
		as = 'h2',
		size = 'h2',
		align = 'center',
		glow = true,
		eyebrow,
		subtitle,
		class: className = '',
		children,
		...rest
	}: {
		as?: string;
		size?: Size;
		align?: Align;
		glow?: boolean;
		eyebrow?: string;
		subtitle?: string;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const classes = $derived(
		[
			'bfd-heading',
			`bfd-heading--size-${size}`,
			`bfd-heading--${align}`,
			glow ? 'bfd-heading--glow' : '',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={classes} {...rest}>
	{#if eyebrow}<span class="bfd-heading__eyebrow">{eyebrow}</span>{/if}
	<svelte:element this={as} class="bfd-heading__title">{@render children?.()}</svelte:element>
	{#if subtitle}<p class="bfd-heading__sub">{subtitle}</p>{/if}
</div>

<style>
	.bfd-heading {
		margin: 0;
	}
	.bfd-heading__title {
		font-family: var(--font-heading);
		font-weight: var(--font-weight-bold);
		color: var(--primary-teal-pale, var(--primary-blue-pale));
		line-height: var(--line-height-tight);
		margin: 0;
		text-wrap: balance;
	}
	.bfd-heading--glow .bfd-heading__title {
		text-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
	}
	.bfd-heading--center {
		text-align: center;
	}
	.bfd-heading--center .bfd-heading__eyebrow {
		display: block;
	}
	.bfd-heading__eyebrow {
		font-family: var(--font-mono);
		font-size: var(--font-size-small);
		letter-spacing: var(--tracking-label);
		color: var(--primary-teal-bright, var(--primary-blue-bright));
		margin: 0 0 var(--spacing-md);
	}
	.bfd-heading__sub {
		font-family: var(--font-accent);
		font-weight: 400;
		font-size: var(--font-size-body);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
		margin: var(--spacing-md) 0 0;
		max-width: 60ch;
	}
	.bfd-heading--center .bfd-heading__sub {
		margin-left: auto;
		margin-right: auto;
	}
	.bfd-heading--size-h1 .bfd-heading__title {
		font-size: var(--font-size-h1);
	}
	.bfd-heading--size-h2 .bfd-heading__title {
		font-size: var(--font-size-h2);
	}
	.bfd-heading--size-h3 .bfd-heading__title {
		font-size: var(--font-size-h3);
	}
</style>
