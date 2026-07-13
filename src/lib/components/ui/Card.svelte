<script lang="ts">
	import type { Snippet } from 'svelte';

	type Padding = 'none' | 'md' | 'lg';

	let {
		padding = 'md',
		hover = false,
		class: className = '',
		children,
		...rest
	}: {
		padding?: Padding;
		hover?: boolean;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const classes = $derived(
		['bfd-card', `bfd-card--pad-${padding}`, hover ? 'bfd-card--hover' : '', className]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={classes} {...rest}>
	<div class="bfd-card__body">{@render children?.()}</div>
</div>

<style>
	.bfd-card {
		position: relative;
		background: linear-gradient(
			160deg,
			color-mix(in srgb, var(--background-card) 88%, white 12%) 0%,
			var(--background-card) 55%
		);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-card);
		overflow: hidden;
		transition:
			box-shadow var(--duration-slow) var(--easing-ease-out),
			transform var(--duration-slow) var(--easing-ease-out);
	}
	.bfd-card__body {
		position: relative;
		z-index: 2;
	}
	.bfd-card--pad-md .bfd-card__body {
		padding: var(--spacing-xl);
	}
	.bfd-card--pad-lg .bfd-card__body {
		padding: var(--spacing-2xl);
	}
	.bfd-card--pad-none .bfd-card__body {
		padding: 0;
	}

	.bfd-card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 10px,
			rgba(30, 58, 138, 0.03) 10px,
			rgba(30, 58, 138, 0.03) 20px
		);
		opacity: 1;
		transition: opacity var(--duration-fast) ease;
	}
	.bfd-card::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		z-index: 1;
		pointer-events: none;
		background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent);
		transform: translateX(-100%);
		transition: transform 0.8s var(--easing-ease-out);
	}
	.bfd-card--hover:hover {
		box-shadow: var(--shadow-card-hover);
		transform: translateY(-6px);
	}
	.bfd-card--hover:hover::before {
		opacity: 0;
	}
	.bfd-card--hover:hover::after {
		transform: translateX(100%);
	}
</style>
