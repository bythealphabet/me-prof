<script lang="ts">
	import { resolve } from '$app/paths';
	import PaletteControl from './PaletteControl.svelte';
	import profile from '$lib/data/profile.json';

	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 30);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header class="bfd-nav" class:is-scrolled={scrolled}>
	<a class="bfd-nav__logo" href={resolve('/')}
		>&lt;{profile.firstName}<span>{profile.lastName}</span>/&gt;</a
	>
	<nav class="bfd-nav__links">
		<a href="{resolve('/')}#about">About</a>
		<a href="{resolve('/')}#skills">Skills</a>
		<a href="{resolve('/')}#experience">Experience</a>
		<a href={resolve('/projects')}>Projects</a>
		<a href="{resolve('/')}#contact">Contact</a>
	</nav>
	<PaletteControl />
</header>

<style>
	.bfd-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 1.4rem clamp(2rem, 4vw, 5rem);
		transition:
			background var(--duration-fast) ease,
			box-shadow var(--duration-fast) ease,
			backdrop-filter var(--duration-fast) ease;
	}
	.bfd-nav.is-scrolled {
		background: color-mix(in srgb, var(--background-dark-alt) 72%, transparent);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		box-shadow: 0 8px 30px rgba(11, 28, 48, 0.25);
	}
	.bfd-nav__logo {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 2rem;
		letter-spacing: 0.04em;
		color: var(--primary-teal-bright);
		text-decoration: none;
		white-space: nowrap;
	}
	.bfd-nav__logo span {
		color: var(--primary-teal-pale);
	}
	.bfd-nav__links {
		display: flex;
		gap: clamp(1.4rem, 2vw, 3rem);
	}
	.bfd-nav__links a {
		font-family: var(--font-accent);
		font-weight: 600;
		font-size: 1.5rem;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color var(--duration-fast) ease;
	}
	.bfd-nav__links a:hover {
		color: var(--primary-teal-bright);
	}
	@media (max-width: 760px) {
		.bfd-nav__links {
			display: none;
		}
	}
</style>
