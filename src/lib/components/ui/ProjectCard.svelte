<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		href,
		cta = 'View project →',
		tilt = true,
		icon,
		imgUrl,
		class: className = '',
		...rest
	}: {
		title: string;
		description: string;
		href?: string;
		cta?: string;
		tilt?: boolean;
		icon?: Snippet;
		imgUrl?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let el: HTMLElement | undefined = $state();
	let transform = $state('perspective(1000px)');

	function handleMove(e: MouseEvent) {
		if (!tilt || !el) return;
		const r = el.getBoundingClientRect();
		const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 3;
		const ry = ((r.width / 2 - (e.clientX - r.left)) / (r.width / 2)) * 3;
		transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
	}

	function reset() {
		transform = 'perspective(1000px)';
	}
</script>

{#if href}
	<!-- Callers must pre-resolve internal hrefs with resolve()/asset() from $app/paths. -->
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<div class={['container', className].filter(Boolean).join(' ')}>
		<div class="img-wrapper">
			<img src={imgUrl} alt="" />
		</div>
		<div class="content">
			<h3 class="title">{title}</h3>
			<p class="desc">{description}</p>
			<span class="more">{cta}</span>
		</div>
		<a
			bind:this={el}
			{href}
			style="transform: {transform}"
			onmousemove={handleMove}
			onmouseleave={reset}
			{...rest}
		>
			{#if icon}<span class="bfd-service__icon">{@render icon()}</span>{/if}
		</a>
	</div>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
	<button
		bind:this={el}
		type="button"
		class={['bfd-service', className].filter(Boolean).join(' ')}
		style="transform: {transform}"
		onmousemove={handleMove}
		onmouseleave={reset}
		{...rest}
	>
		{#if icon}<span class="bfd-service__icon">{@render icon()}</span>{/if}
		<h3 class="bfd-service__title">{title}</h3>
		<p class="bfd-service__desc">{description}</p>
		<span class="bfd-service__more">{cta}</span>
	</button>
{/if}

<style lang="scss">
	.container {
		position: relative;
		height: 100%;
		min-height: var(--card-size-h, 38rem);
		text-align: left;
		background: linear-gradient(
			160deg,
			color-mix(in srgb, var(--background-card) 88%, white 12%) 0%,
			var(--background-card) 55%
		);
		display: grid;
		grid-template-columns: var(--spacing-xl) 1fr var(--spacing-xl);
		grid-template-rows: var(--spacing-xl) 1fr var(--spacing-xl);
		border: none;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-card);
		/*padding: var(--spacing-xl);*/
		overflow: hidden;
		cursor: pointer;
		font-family: inherit;
		color: inherit;
		text-decoration: none;
		transform: perspective(1000px);
		transform-style: preserve-3d;
		transition:
			box-shadow 800ms var(--easing-ease-out),
			transform 250ms var(--easing-ease-out);
	}
	.container::before {
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
		transition: opacity var(--duration-fast) ease;
	}
	.container::after {
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
	.container:hover {
		box-shadow: var(--shadow-card-hover);
	}
	.container:hover::before {
		opacity: 0;
	}
	.container:hover::after {
		transform: translateX(100%);
	}
	.container:focus-visible {
		outline: 3px solid var(--primary-teal, var(--primary-blue-light));
		outline-offset: 3px;
	}

	.container > * {
		position: relative;
		z-index: 2;
	}

	.content {
		grid-column: 2;
		grid-row: 2;
	}

	a {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
	}

	.img-wrapper {
		display: flex;
		grid-column: 2;
		grid-row: 2;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 4.4rem;
		height: 4.4rem;
		margin-bottom: var(--spacing-md);
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--primary-blue) 28%, transparent);
		color: var(--primary-teal-bright, var(--primary-blue-bright));
	}
	.title {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: clamp(2.4rem, 2.5vw, 3rem);
		color: var(--text-secondary);
		margin: 0 0 var(--spacing-md);
		transform: translateZ(10px);
	}
	.desc {
		font-family: var(--font-body);
		color: var(--text-tertiary);
		line-height: var(--line-height-relaxed);
		font-size: var(--font-size-body);
		margin: 0;
		flex: 1;
		transform: translateZ(5px);
	}
	.more {
		margin-top: var(--spacing-lg);
		font-family: var(--font-mono);
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--accent-coral, var(--primary-blue-bright));
		transition: color var(--duration-fast) ease;
	}
	.container:hover .more {
		color: var(--primary-teal-bright, var(--primary-blue-light));
	}
	@media (prefers-reduced-motion: reduce) {
		.container {
			transform: none !important;
		}
	}
</style>
