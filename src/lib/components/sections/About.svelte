<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import profile from '$lib/data/profile.json';
	import { onMount } from 'svelte';
	import { sectionScroll } from '$lib/animations/homescroll.svelte';
	import CanvasImageWrap from '$lib/components/layout/canvasImageWrap.svelte';

	let section: HTMLElement;

	onMount(() => {
		sectionScroll(section);
	});
</script>

<section class="base-grid bfd-section" id="about" bind:this={section}>
	<div class="base-grid bfd-about">
		<div class="bfd-about__title">
			<SectionHeading eyebrow="// About Me" align="left">Who I Am</SectionHeading>
		</div>
		<article class="bfd-about__copy">
			<div class="desktop">
				<CanvasImageWrap bioParagraphs={profile.bio} />
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
		<div class="bfd-about__facts">
			<h4>Outside of code</h4>
			<ul role="list">
				{#each profile.funFacts as fact (fact)}
					<li>{fact}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style lang="scss">
	.bfd-section {
		opacity: 0;
		min-height: 100vh;
		background: var(--background-dark);

		grid-column: 1 / -1;
	}

	.bfd-about {
		display: grid;
		grid-template-rows: 4.8rem 10rem auto 5rem auto 10rem;
		grid-column: 1 / -1;

		@media (min-width: 820px) {
			grid-template-rows: 4.8rem 10rem auto 5rem auto 10rem;
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

		@media (min-width: 768px) {
			display: grid;
		}
	}

	.bfd-about__facts {
		margin-top: var(--spacing-2xl);
		grid-column: 3 / -3;
		grid-row: 5;
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
		font-size: 2rem;
		font-size: clamp(1.6rem, 1.6vw, 1.9rem);
		line-height: var(--line-height-normal);
	}
</style>
