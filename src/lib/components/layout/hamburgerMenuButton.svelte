<script lang="ts">
	let { open = $bindable(false) }: { open?: boolean } = $props();

	function toggle() {
		open = !open;
	}
</script>

<button
	type="button"
	class="bfd-burger"
	class:is-open={open}
	aria-label={open ? 'Close menu' : 'Open menu'}
	aria-expanded={open}
	aria-controls="bfd-mobile-nav"
	onclick={toggle}
>
	<span class="bfd-burger__glow" aria-hidden="true"></span>
	<span class="bfd-burger__bars" aria-hidden="true">
		<span class="bfd-burger__bar bfd-burger__bar--top"></span>
		<span class="bfd-burger__bar bfd-burger__bar--mid"></span>
		<span class="bfd-burger__bar bfd-burger__bar--bottom"></span>
	</span>
</button>

<style>
	.bfd-burger {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 4.4rem;
		height: 4.4rem;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: transparent;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	/* soft radial glow that blooms in on hover / open */
	.bfd-burger__glow {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--primary-teal) 88%, transparent) 0%,
			transparent 72%
		);
		opacity: 0;
		transform: scale(0.55);
		transition:
			opacity var(--duration-normal) var(--easing-ease-out),
			transform var(--duration-normal) var(--easing-ease-out);
	}
	.bfd-burger:hover .bfd-burger__glow,
	.bfd-burger.is-open .bfd-burger__glow {
		opacity: 1;
		transform: scale(1);
	}

	.bfd-burger__bars {
		position: relative;
		width: 2.6rem;
		height: 1.8rem;
	}

	.bfd-burger__bar {
		position: absolute;
		left: 0;
		height: 0.3rem;
		border-radius: var(--radius-pill);
		background: var(--text-secondary);
		transition:
			width var(--duration-fast) var(--easing-ease-out),
			transform var(--duration-fast) var(--easing-ease-out),
			opacity var(--duration-fast) var(--easing-ease-out),
			background var(--duration-fast) var(--easing-ease-out);
	}

	/* asymmetric "code line" resting state — reads as intentional, not generic */
	.bfd-burger__bar--top {
		top: 0;
		width: 65%;
	}
	.bfd-burger__bar--mid {
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
		transition-delay: 120ms;
	}
	.bfd-burger__bar--bottom {
		bottom: 0;
		width: 45%;
	}

	.bfd-burger:hover:not(.is-open) .bfd-burger__bar--top,
	.bfd-burger:hover:not(.is-open) .bfd-burger__bar--bottom {
		width: 100%;
	}

	/* morph into an X — bars rotate to meet at center, middle bar dissolves first */
	.bfd-burger.is-open .bfd-burger__bar--top {
		width: 100%;
		background: var(--primary-teal-bright);
		transform: translateY(0.75rem) rotate(45deg);
		transition-delay: 80ms;
	}
	.bfd-burger.is-open .bfd-burger__bar--bottom {
		width: 100%;
		background: var(--primary-teal-bright);
		transform: translateY(-0.75rem) rotate(-45deg);
		transition-delay: 80ms;
	}
	.bfd-burger.is-open .bfd-burger__bar--mid {
		opacity: 0;
		transform: translateY(-50%) scaleX(0.3);
		transition-delay: 0ms;
	}

	@media (prefers-reduced-motion: reduce) {
		.bfd-burger__glow,
		.bfd-burger__bar {
			transition: none;
		}
	}
</style>
