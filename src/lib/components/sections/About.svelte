<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import profile from '$lib/data/profile.json';
	import { onMount } from 'svelte';
	import { sectionScroll } from '$lib/animations/homescroll.svelte';
	// import CanvasImageWrap from '$lib/components/layout/canvasImageWrap.svelte';
	import CanvasImageWrap from '$lib/components/layout/canvasImageWrap.svelte';

	let section: HTMLElement | undefined = $state();
	let canvasComponent: { resetGame: () => void } | null = $state(null);

	// Game reactive states
	let gameCompleted = $state(false);

	onMount(() => {
		if (section) sectionScroll(section);
	});

	// Callback dispatched by the child Canvas when matching occurs
	function handleGameMatch(matched: boolean) {
		gameCompleted = matched;
	}

	// If scrolling begins, reset the game state and snap the avatar back
	// function handleWindowScroll() {
	// 	if (gameCompleted) {
	// 		gameCompleted = false;
	// 		canvasComponent?.resetGame();
	// 	}
	// }
</script>

<!-- <svelte:window onscroll={handleWindowScroll} /> -->

<section class="base-grid bfd-section" id="about" bind:this={section}>
	<div class="base-grid bfd-about">
		<div class="bfd-about__title">
			<SectionHeading eyebrow="// About Me" align="left">Who I Am</SectionHeading>
		</div>

		<article class="bfd-about__copy">
			<div class="desktop">
				<!-- Passing our Svelte 5 callback handler to trigger state -->
				<CanvasImageWrap
					bind:this={canvasComponent}
					bioParagraphs={profile.bio}
					onTargetReached={handleGameMatch}
				/>
			</div>

			<div class="mobile">
				<div class="img-box">
					<img class="img" src="/profile-img/me-img.png" alt="" aria-hidden="true" />
				</div>
				{#each profile.bio as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</article>

		<!--
			Animated Hobbies Card (Banner format):
			Fades & slides up cleanly from the bottom of the section when the game succeeds
		-->
		<div class="bfd-about__facts" class:visible={gameCompleted || !section}>
			<div class="facts-card">
				<h4>Outside of code</h4>
				<ul role="list">
					{#each profile.funFacts as fact (fact)}
						<li>{fact}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.bfd-section {
		opacity: 0;
		min-height: 100vh;
		background: var(--background-dark);
		grid-column: 1 / -1;
		position: relative;
	}

	.bfd-about {
		grid-column: 1 / -1;
		height: 100%;

		@media (min-width: 767px) {
			display: grid;
			grid-template-rows: 4.8rem 10rem auto 5rem minmax(10rem, auto) 20rem;
		}
	}

	.bfd-about__title {
		grid-column: 3 / -3;
		grid-row: 2;
		align-self: end;
	}

	.bfd-about__copy {
		margin-top: var(--spacing-xl);
		grid-column: 2 / -2;
		grid-row: 3;

		@media (min-width: 820px) {
			grid-column: 3 / -3;
		}

		.img-box {
			border: solid 0.2rem var(--accent-terracotta);
			border-radius: 50%;
			overflow: hidden;
			width: 30%;
			float: left;
			shape-outside: circle(50%);
			margin-right: var(--spacing-xl);
		}
	}

	.bfd-about__copy p {
		font-size: clamp(1.6rem, 1.6vw, 1.9rem);
		line-height: var(--line-height-relaxed);
		color: var(--text-tertiary);
	}

	.mobile {
		display: block;

		@media (min-width: 768px) {
			display: none;
		}
	}

	.desktop {
		display: none;
		height: 520px; /* Enhanced canvas spatial layout height */

		@media (min-width: 768px) {
			display: grid;
		}
	}

	/* Hobbies card container transition rules */
	.bfd-about__facts {
		grid-row: 6 / span 2;
		grid-column: 2 / -2;
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1),
			transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
		pointer-events: none;

		&.visible {
			opacity: 1;
			transform: translateY(0);
			pointer-events: all;
		}

		/* No drag-game on mobile (the canvas lives in .desktop), so this card can't
		   ever reach `visible` via gameCompleted — just show it plainly, no animation. */
		@media (max-width: 767px) {
			opacity: 1;
			transform: none;
			transition: none;
			pointer-events: all;
		}

		@media (min-width: 767px) {
			grid-column: 3 / -3;
		}
	}

	/* Elegant floating banner design */
	.facts-card {
		/* background: rgba(255, 255, 255, 0.03); */
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 16px;
		padding: var(--spacing-xl) var(--spacing-2xl);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		background: var(--background-card);
	}

	.bfd-about__facts h4 {
		font-family: var(--font-accent);
		font-size: 2.4rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-secondary);
		margin: 0 0 var(--spacing-md);
	}

	.bfd-about__facts ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
		gap: var(--spacing-sm) var(--spacing-lg);
	}

	.bfd-about__facts li {
		color: var(--text-secondary);
		font-size: clamp(1.6rem, 1.6vw, 1.9rem);
		line-height: var(--line-height-normal);
	}
</style>
