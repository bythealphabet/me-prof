<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'tag' | 'solid' | 'outline';
	type Tone = 'default' | 'coral' | 'gold';
	type Size = 'sm' | 'md';

	let {
		variant = 'tag',
		tone = 'default',
		size = 'sm',
		dot = false,
		class: className = '',
		children,
		...rest
	}: {
		variant?: Variant;
		tone?: Tone;
		size?: Size;
		dot?: boolean;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const classes = $derived(
		[
			'bfd-badge',
			`bfd-badge--${variant}`,
			`bfd-badge--${size}`,
			tone !== 'default' ? `bfd-badge--${tone}` : '',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<span class={classes} {...rest}>
	{#if dot}<span class="bfd-badge__dot"></span>{/if}
	{@render children?.()}
</span>

<style>
	.bfd-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-accent);
		font-weight: 700;
		font-size: 1.1rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		line-height: 1;
		padding: 0.55rem 1.1rem;
		border-radius: var(--radius-pill);
		white-space: nowrap;
	}
	.bfd-badge--md {
		font-size: 1.3rem;
		padding: 0.7rem 1.4rem;
	}

	.bfd-badge--tag {
		background: color-mix(in srgb, var(--primary-blue) 30%, transparent);
		color: var(--primary-teal-pale, var(--primary-blue-pale));
	}

	.bfd-badge--solid {
		background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-bright) 100%);
		color: var(--text-primary);
		box-shadow: 0 4px 15px rgba(96, 165, 250, 0.4);
		border-radius: var(--radius-sm);
	}

	.bfd-badge--outline {
		background: transparent;
		color: var(--text-secondary);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text-light) 40%, transparent);
	}

	.bfd-badge--coral.bfd-badge--tag {
		background: color-mix(in srgb, var(--accent-coral) 22%, transparent);
		color: var(--accent-coral);
	}
	.bfd-badge--gold.bfd-badge--tag {
		background: color-mix(in srgb, var(--accent-gold) 22%, transparent);
		color: var(--accent-gold);
	}

	.bfd-badge__dot {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		background: currentColor;
	}
</style>
