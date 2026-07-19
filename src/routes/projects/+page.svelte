<script lang="ts">
	import { resolve } from '$app/paths';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import { projects } from '$lib/data/projects';
	import profile from '$lib/data/profile.json';
</script>

<svelte:head>
	<title>Projects — {profile.name}</title>
</svelte:head>

<section class="bfd-section">
	<SectionHeading eyebrow="// Everything I've Shipped" align="center">All Projects</SectionHeading>
	<div class="bfd-projects-grid">
		{#each projects as project (project.meta.slug)}
			<ProjectCard
				title={project.meta.title}
				description={project.meta.summary}
				href={resolve('/projects/[slug]', { slug: project.meta.slug })}
				imgUrl={project.meta.imgUrl}
			/>
		{/each}
	</div>
</section>

<style>
	.bfd-section {
		padding: clamp(12rem, 14vw, 18rem) clamp(2rem, 5vw, 8rem) clamp(8rem, 12vw, 15rem);
		background: var(--background-dark);
		grid-column: 1 / -1;
	}
	.bfd-projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
		gap: 2.4rem;
		max-width: 120rem;
		margin: var(--spacing-3xl) auto 0;
	}
</style>
