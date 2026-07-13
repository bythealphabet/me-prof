<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import profile from '$lib/data/profile.json';
</script>

<section class="bfd-hero bfd-blueprint-grid">
	<div class="bfd-hero__content">
		<Badge variant="outline" dot>{profile.tagline}</Badge>
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
		min-height: 100vh;
		display: flex;
		align-items: center;
		overflow: hidden;
		background: linear-gradient(
			to bottom,
			var(--background-dark-alt) 80%,
			var(--background-dark) 100%
		);
	}
	.bfd-hero__content {
		position: relative;
		z-index: 2;
		width: clamp(28rem, 60vw, 80rem);
		padding: 0 clamp(2rem, 5vw, 8rem);
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
		color: var(--primary-teal-bright);
		text-shadow: 0 0 20px rgba(96, 165, 250, 0.35);
		margin: 0 0 var(--spacing-md);
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
	@media (max-width: 760px) {
		.bfd-hero {
			padding-top: 8rem;
		}
		.bfd-hero__content {
			width: 100%;
		}
	}
</style>
