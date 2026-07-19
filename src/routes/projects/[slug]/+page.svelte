<script lang="ts">
	import { resolve } from '$app/paths';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import profile from '$lib/data/profile.json';

	let { data } = $props();
	const project = $derived(data.project);
</script>

<svelte:head>
	<title>{project.meta.title} — {profile.name}</title>
</svelte:head>

<article class="bfd-section">
	<div class="bfd-project">
		<div class="bfd-project__back">
			<Button variant="tertiary" href={resolve('/projects')}>
				<span aria-hidden="true">←</span> All projects
			</Button>
		</div>
		<div class="bfd-project__tags">
			{#each project.meta.tags as tag (tag)}
				<Badge variant="tag">{tag}</Badge>
			{/each}
		</div>
		<h1 class="bfd-project__title">{project.meta.title}</h1>
		<p class="bfd-project__summary">{project.meta.summary}</p>
		<div class="bfd-project__links">
			{#if project.meta.repo}
				<Button variant="secondary" href={project.meta.repo}>View code</Button>
			{/if}
			{#if project.meta.demo}
				<Button variant="ghost" href={project.meta.demo}>Live demo</Button>
			{/if}
		</div>
		{#if project.meta.imgUrl}
			<div class="bfd-project__media">
				<img
					src={project.meta.imgUrl}
					alt="Screenshot of the {project.meta.title} website"
					loading="eager"
					decoding="async"
				/>
			</div>
		{/if}
		<div class="bfd-project__body">
			<project.content />
		</div>
	</div>
</article>

<style>
	.bfd-section {
		padding: clamp(12rem, 14vw, 18rem) clamp(2rem, 5vw, 8rem) clamp(8rem, 12vw, 15rem);
		background: var(--background-dark);
		grid-column: 1 / -1;
	}
	.bfd-project {
		max-width: 76rem;
		margin: 0 auto;
	}
	.bfd-project__back {
		margin-bottom: var(--spacing-xl);
	}
	.bfd-project__tags {
		display: flex;
		gap: 0.8rem;
		margin-bottom: var(--spacing-md);
	}
	.bfd-project__title {
		font-family: var(--font-heading);
		color: var(--primary-teal-pale, var(--primary-blue-pale));
		text-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
	}
	.bfd-project__summary {
		font-size: var(--font-size-body);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
	}
	.bfd-project__links {
		display: flex;
		gap: var(--spacing-md);
		margin: var(--spacing-lg) 0 var(--spacing-2xl);
	}
	.bfd-project__media {
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-card);
		background: var(--background-card);
		margin-bottom: var(--spacing-2xl);
	}
	.bfd-project__media img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.bfd-project__body :global(h2) {
		font-size: var(--font-size-h3);
		color: var(--text-primary);
	}
	.bfd-project__body :global(p),
	.bfd-project__body :global(li) {
		color: var(--text-tertiary);
		line-height: var(--line-height-relaxed);
	}
</style>
