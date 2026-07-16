<script lang="ts">
	import { resolve } from '$app/paths';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { projects } from '$lib/data/projects';
	import { onMount } from 'svelte';
	import { sectionScroll } from '$lib/animations/homescroll.svelte';

	const preview = $derived(projects.slice(0, 3));

	let section: HTMLElement;
	onMount(() => {
		sectionScroll(section);
	});
</script>

<section class="bfd-section bfd-section--alt" id="projects" bind:this={section}>
	<SectionHeading eyebrow="// Selected Work" align="center">Projects</SectionHeading>
	<div class="bfd-projects-grid">
		{#each preview as project (project.meta.slug)}
			<ProjectCard
				title={project.meta.title}
				description={project.meta.summary}
				href={resolve('/projects/[slug]', { slug: project.meta.slug })}
			/>
		{/each}
	</div>
	<div class="bfd-projects-more">
		<Button variant="ghost" href={resolve('/projects')}>View all projects →</Button>
	</div>
</section>

<style>
	.bfd-section {
		padding: clamp(8rem, 12vw, 15rem) clamp(2rem, 5vw, 8rem);
		background: var(--background-dark);
		opacity: 0;

		grid-column: 1 / -1;
	}
	.bfd-section--alt {
		background: var(--background-dark-alt);
	}
	.bfd-projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
		gap: 2.4rem;
		max-width: 120rem;
		margin: var(--spacing-3xl) auto 0;
	}
	.bfd-projects-more {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-2xl);
	}
</style>
