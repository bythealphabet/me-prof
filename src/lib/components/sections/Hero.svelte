<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import profile from '$lib/data/profile.json';
</script>

<section class="base-grid bfd-hero bfd-blueprint-grid">
	<div class="bfd-hero__content">
		<Badge variant="outline" dot size="md">{profile.tagline}</Badge>
		<h1 class="bfd-hero__title"><span>{profile.name}</span>.</h1>
		<p class="bfd-hero__tag">{profile.heroIntro}</p>
		<div class="bfd-hero__cta">
			<Button variant="primary" href={resolve('/projects')}>View my work</Button>
			<Button variant="secondary" href={asset('/resume.pdf')}>Download CV</Button>
		</div>
	</div>
</section>

<style>
	.bfd-hero {
		position: relative;
		display: grid;
		grid-template-rows: 2rem repeat(2, minmax(8.4rem, 20rem));

		overflow: hidden;
		background: linear-gradient(
			to bottom,
			var(--background-dark-alt) 80%,
			var(--background-dark) 100%
		);

		grid-column: 1 / -1;

		@media (min-width: 820px) {
			grid-template-rows: 7.2rem repeat(2, minmax(10.4rem, 28rem));
		}
	}
	.bfd-hero__content {
		position: relative;
		z-index: 2;
		width: clamp(28rem, 60vw, 80rem);
		grid-column: 2 / -2;
		grid-row: 1 / 4;

		align-self: center;

		@media (min-width: 760px) {
			grid-row: 1 / 4;
		}
	}
	.bfd-hero__content :global(.bfd-badge) {
		margin-bottom: var(--spacing-lg);
	}
	.bfd-hero__title {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: var(--font-size-hero);
		line-height: 1.05;
		letter-spacing: 2px;
		word-spacing: 0px;
		color: var(--primary-teal-bright);
		text-shadow: 0 0 20px rgba(96, 165, 250, 0.35);
		padding-top: 2.4rem;
	}

	.bfd-hero__title span {
		color: var(--primary-teal-pale);
	}
	.bfd-hero__tag {
		font-size: clamp(1.6rem, 2vw, 2.4rem);
		color: var(--text-secondary);
		font-weight: 400;
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--spacing-xl);
		max-width: 60ch;
	}
	.bfd-hero__cta {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
	}
	/*@media (max-width: 760px) {
		.bfd-hero {
			padding-top: 8rem;
		}
		.bfd-hero__content {
			width: 100%;
		}
	}*/
</style>
