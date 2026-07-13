<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import profile from '$lib/data/profile.json';
</script>

<section class="base-grid bfd-section" id="about">
	<div class="bfd-about">
		<SectionHeading eyebrow="// About Me" align="center">Who I Am</SectionHeading>
		<div class="bfd-about__copy">
			{#each profile.bio as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</div>
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

<style>
	.bfd-section {
		padding: clamp(8rem, 12vw, 15rem) clamp(2rem, 5vw, 8rem);
		background: var(--background-dark);

		grid-column: 1 / -1;
	}
	.bfd-about {
		max-width: 90rem;
		margin: 0 auto;
		grid-column: 1 / -1;
	}
	.bfd-about__copy {
		margin-top: var(--spacing-xl);
	}
	.bfd-about__copy p {
		font-size: clamp(1.6rem, 1.6vw, 1.9rem);
		line-height: var(--line-height-relaxed);
		color: var(--text-tertiary);
	}
	.bfd-about__facts {
		margin-top: var(--spacing-2xl);
	}
	.bfd-about__facts h4 {
		font-family: var(--font-accent);
		font-size: 1.4rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-primary);
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
		font-size: var(--font-size-body);
		line-height: var(--line-height-normal);
	}
</style>
