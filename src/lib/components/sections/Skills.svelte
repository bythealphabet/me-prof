<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import skillGroups from '$lib/data/skills.json';
	import { onMount } from 'svelte';
	import { sectionScroll } from '$lib/animations/homescroll.svelte';

	const LOGO_TOKEN = 'pk_FZARRPCBSCWuc9GVTspCAg';

	function logoUrl(domain: string | null): string {
		if (!domain) return '';
		return `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&format=webp&retina=true`;
	}

	let section: HTMLElement;
	onMount(() => {
		sectionScroll(section);
	});
</script>

<section class="base-grid bfd-section bfd-section--alt" id="skills" bind:this={section}>
	<div class="bfd-section__header">
		<SectionHeading eyebrow="// Tech Stack" align="left">Skills</SectionHeading>
	</div>
	<div class="bfd-skills">
		{#each skillGroups as group (group.category)}
			<article class="bfd-skill-card">
				<h4 class="bfd-skill-card__category">
					{group.category}
				</h4>

				<div class="bfd-skill-card__tags">
					{#each group.skills as skill (skill.name)}
						<Badge
							variant="solid"
							size="lg"
							tone="coral"
							logo={logoUrl(skill.logo)}
							imgUrl={skill.imgUrl}
						>
							{skill.name}
						</Badge>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.bfd-section {
		background: var(--background-dark);
		grid-template-rows: 4.8rem auto auto 10rem;
		grid-column: 1 / -1;
	}

	.bfd-section--alt {
		background: var(--background-dark-alt);
	}

	.bfd-section__header {
		grid-row: 2;
		grid-column: 3 / -3;
		margin-bottom: 5rem;
	}

	.bfd-skills {
		grid-column: 3 / -3;
		grid-row: 3;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
		gap: 3rem;
	}

	.bfd-skill-card {
		padding: 3rem;

		min-height: 24rem;

		border-radius: 1rem;

		border: 1px solid rgba(120, 160, 255, 0.12);

		/*background:
			radial-gradient(circle at top left, rgba(120, 170, 255, 0.12), transparent 65%),
			linear-gradient(135deg, rgba(42, 60, 105, 0.5), rgba(17, 25, 45, 0.55));*/

		backdrop-filter: blur(8px);

		transition:
			transform 0.35s ease,
			border-color 0.35s ease,
			box-shadow 0.35s ease;
	}

	.bfd-skill-card:hover {
		transform: translateY(-6px);

		border-color: rgba(130, 170, 255, 0.35);

		box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
	}

	.bfd-skill-card__category {
		margin: 0 0 2.5rem;

		font-family: var(--font-accent);
		font-size: 2rem;
		font-weight: 700;

		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.bfd-skill-card__tags {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;

		gap: 1rem;
	}
</style>
