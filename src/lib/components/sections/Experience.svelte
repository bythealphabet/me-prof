<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import experience from '$lib/data/experience.json';
	import { onMount } from 'svelte';
	import { sectionScroll, experienceScroll } from '$lib/animations/homescroll.svelte';

	let section: HTMLElement;
	let timelineContainer: HTMLElement;
	let timelineElements: (HTMLElement | undefined)[] = $state([]);

	onMount(() => {
		sectionScroll(section);
		// Pass both the container and the child items
		experienceScroll(timelineContainer, timelineElements);
	});
</script>

<section class="bfd-section" id="experience" bind:this={section}>
	<SectionHeading eyebrow="// Where I've Been" align="center">Experience</SectionHeading>

	<!-- Bind the container here -->
	<ol class="bfd-timeline" role="list" bind:this={timelineContainer}>
		<!-- The growing progress line overlay -->
		<div class="bfd-timeline__line-progress"></div>

		{#each experience as entry, i (entry.period + entry.title)}
			<li class="bfd-timeline__item" bind:this={timelineElements[i]}>
				<span class="bfd-timeline__dot"></span>
				<div class="bfd-timeline__card">
					<span class="bfd-timeline__period">{entry.period}</span>
					<h3 class="bfd-timeline__role">{entry.title}</h3>
					<p class="bfd-timeline__summary">{entry.summary}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.bfd-section {
		padding: clamp(8rem, 12vw, 15rem) clamp(2rem, 5vw, 8rem);
		background: var(--background-dark);
		grid-column: 1 / -1;
	}

	.bfd-timeline {
		position: relative;
		max-width: 80rem;
		margin: var(--spacing-3xl) auto 0;
		padding-left: 2.4rem;
		border-left: 0.2rem solid color-mix(in srgb, var(--primary-blue) 40%, transparent);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2xl);
	}

	.bfd-timeline__item {
		position: relative;
	}

	.bfd-timeline__dot {
		position: absolute;
		left: -3.05rem;
		top: 0.4rem;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		background: var(--primary-teal-bright, var(--primary-blue-bright));
		box-shadow: 0 0 0 4px var(--background-dark);
	}

	.bfd-timeline {
		position: relative;
		max-width: 80rem;
		margin: var(--spacing-3xl) auto 0;
		padding-left: 2.4rem;
		/* This remains as the static, dimmed background track line */
		border-left: 0.2rem solid color-mix(in srgb, var(--primary-blue) 20%, transparent);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2xl);
	}

	/* NEW: Styles for the bright growing progress line overlay */
	.bfd-timeline__line-progress {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 0.2rem;
		/* Pin the transform origin to the top so it scales downwards */
		transform-origin: top center;
		background: var(--primary-teal-bright, var(--primary-blue-bright));
		/* Optional: adds a nice subtle glow to the leading edge of the line */
		box-shadow: 0 0 8px var(--primary-teal-bright, var(--primary-blue-bright));
		pointer-events: none;
	}

	.bfd-timeline__item {
		position: relative;
	}

	.bfd-timeline__dot {
		position: absolute;
		left: -3.05rem;
		top: 0.4rem;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		background: var(--primary-teal-bright, var(--primary-blue-bright));
		box-shadow: 0 0 0 4px var(--background-dark);
		/* Ensure smooth transitions if GSAP releases control */
		will-change: transform;
	}

	.bfd-timeline__period {
		font-family: var(--font-mono);
		font-size: 1.3rem;
		letter-spacing: var(--tracking-label);
		color: var(--primary-teal-bright, var(--primary-blue-bright));
	}

	.bfd-timeline__role {
		font-size: var(--font-size-h3);
		color: var(--text-tertiary);
		margin: var(--spacing-xs) 0 var(--spacing-sm);
	}

	.bfd-timeline__summary {
		color: var(--text-tertiary);
		line-height: var(--line-height-relaxed);
		margin: 0;
		max-width: 60ch;
	}
</style>
