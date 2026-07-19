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
		alt = '',
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
		alt?: string;
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
	<a
		bind:this={el}
		{href}
		class={['card', className].filter(Boolean).join(' ')}
		style="transform: {transform}"
		onmousemove={handleMove}
		onmouseleave={reset}
		{...rest}
	>
		{#if imgUrl}
			<div class="media">
				<!-- Decorative: the title right below already names the project. -->
				<img src={imgUrl} {alt} loading="lazy" decoding="async" />
			</div>
		{/if}
		<div class="body">
			{#if icon}<span class="icon">{@render icon()}</span>{/if}
			<h3 class="title">{title}</h3>
			<p class="desc">{description}</p>
			<span class="more">{cta}</span>
		</div>
	</a>
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
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		text-align: left;
		background: linear-gradient(
			160deg,
			color-mix(in srgb, var(--background-card) 88%, white 12%) 0%,
			var(--background-card) 55%
		);
		border: none;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-card);
		overflow: hidden;
		font-family: inherit;
		color: inherit;
		text-decoration: none;
		transform: perspective(1000px);
		transform-style: preserve-3d;
		transition:
			box-shadow 800ms var(--easing-ease-out),
			transform 250ms var(--easing-ease-out);
	}
	.card::before {
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
	.card::after {
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
	.card:hover {
		box-shadow: var(--shadow-card-hover);
	}
	.card:hover::before {
		opacity: 0;
	}
	.card:hover::after {
		transform: translateX(100%);
	}
	.card:focus-visible {
		outline: 3px solid var(--primary-teal, var(--primary-blue-light));
		outline-offset: 3px;
	}

	.card > * {
		position: relative;
		z-index: 2;
	}

	.media {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--background-dark-alt);
	}
	.media img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-slow) var(--easing-ease-out);
	}
	.card:hover .media img {
		transform: scale(1.05);
	}

	.body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: var(--spacing-xl);
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
	.card:hover .more {
		color: var(--primary-teal-bright, var(--primary-blue-light));
	}
	@media (prefers-reduced-motion: reduce) {
		.card,
		.media img {
			transform: none !important;
		}
	}
</style>
