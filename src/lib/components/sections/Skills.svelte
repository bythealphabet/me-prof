<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import skillGroups from '$lib/data/skills.json';
</script>

<section class="bfd-section bfd-section--alt" id="skills">
	<SectionHeading eyebrow="// What I Work With" align="center">Skills</SectionHeading>
	<div class="bfd-skills">
		{#each skillGroups as group (group.category)}
			<div class="bfd-skills__group">
				<h4 class="bfd-skills__category">{group.category}</h4>
				<div class="bfd-skills__tags">
					{#each group.skills as skill (skill)}
						<Badge variant="tag">{skill}</Badge>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.bfd-section {
		padding: clamp(8rem, 12vw, 15rem) clamp(2rem, 5vw, 8rem);
		background: var(--background-dark);

		grid-column: 1 / -1;
	}
	.bfd-section--alt {
		background: var(--background-dark-alt);
	}
	.bfd-skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
		gap: var(--spacing-2xl);
		max-width: 100rem;
		margin: var(--spacing-3xl) auto 0;
	}
	.bfd-skills__category {
		font-family: var(--font-accent);
		font-size: 1.4rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-primary);
		margin: 0 0 var(--spacing-md);
	}
	.bfd-skills__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
