<script lang="ts">
	import { resolve } from '$app/paths';
	import PaletteControl from './PaletteControl.svelte';
	import profile from '$lib/data/profile.json';
	import HamburgerMenu from '$lib/components/layout/hamburgerMenuButton.svelte';
	import { onMount } from 'svelte';
	import { buildIntroTimeline } from '$lib/animations/intro.svelte';
	import { showHeader } from '$lib/stores/scrollStore';

	let leftBracket: HTMLElement;
	let nameEl: HTMLElement;
	let rightBracket: HTMLElement;
	let targetLinks: HTMLElement;
	let targetPalletes = $state<HTMLElement>();
	let darkmodeSwitch = $state<HTMLElement>();

	onMount(() => {
		if (!targetPalletes || !darkmodeSwitch) return;
		buildIntroTimeline({
			logo: [leftBracket, rightBracket, nameEl],
			navLinks: targetLinks.children,
			palette: Array.from(targetPalletes.children) as HTMLElement[],
			themeSwitch: darkmodeSwitch
		});
	});

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const navLinks = [
		{ id: '1', label: 'About', href: '/#about' },
		// { id: '2', label: 'Skills', href: '/#skills' },
		{ id: '3', label: 'Experience', href: '/#experience' },
		{ id: '4', label: 'Projects', href: '/projects' },
		{ id: '5', label: 'Contact', href: '/#contact' }
	];

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY < 50);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});

	// $effect(() => {
	// 	const handleScroll = () => {
	// 		isAtTop = window.scrollY < 50; // Consider "at top" if within 50px
	// 	};

	// 	handleScroll(); // Check initial position
	// 	window.addEventListener('scroll', handleScroll);
	// 	return () => window.removeEventListener('scroll', handleScroll);
	// });

	$effect(() => {
		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') menuOpen = false;
		};
		document.addEventListener('keydown', onKeydown);
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => document.removeEventListener('keydown', onKeydown);
	});
</script>

<header class="base-grid header" class:is-scrolled={scrolled} class:is-hidden={!$showHeader}>
	<a href={resolve('/')} class="logo" aria-label="{profile.firstName} {profile.lastName} – Home">
		<span class="logo-bracket bracket-left" bind:this={leftBracket}>&lt;</span><span
			class="logo-name"
			bind:this={nameEl}
			><span class="logo-first">{profile.firstName}</span><span class="logo-last"
				>{profile.lastName}</span
			></span
		><span class="logo-bracket bracket-right" bind:this={rightBracket}>/&gt;</span>
	</a>
	<span class="burger">
		<HamburgerMenu bind:open={menuOpen} />
	</span>
	<div class="menu" class:is-open={menuOpen}>
		<nav id="bfd-mobile-nav" class="nav">
			<ul class="nav-links" bind:this={targetLinks}>
				{#each navLinks as link (link.id)}
					<li><a onclick={() => (menuOpen = false)} href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="bfd-nav__palette">
			<PaletteControl bind:targetPalletes bind:darkmodeSwitch />
		</div>
	</div>
</header>

<style lang="scss">
	.header {
		position: sticky;
		top: 0;
		z-index: 30;
		transform: translate(0, 0);
		background: var(--background-dark-alt);
		transition:
			background var(--duration-fast) ease,
			box-shadow var(--duration-fast) ease,
			backdrop-filter var(--duration-fast) ease;
		grid-column: 1 / -1;
		transition: transform var(--duration-fast) ease;
	}

	/* .header.is-scrolled {
		background: color-mix(in srgb, var(--background-dark-alt) 72%, transparent);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		box-shadow: 0 8px 30px rgba(11, 28, 48, 0.25);
		transform: translate(0, 0);
	} */

	.header.is-hidden {
		transform: translate(0, -100%);
	}

	.logo {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 2.3rem;
		letter-spacing: 0.04em;
		color: var(--primary-teal-bright);
		text-decoration: none;
		white-space: nowrap;

		grid-column: 2 / 4;
		align-self: center;
		display: flex;
		align-items: center;

		@media (min-width: 1175px) {
			font-size: 2.6rem;
		}
	}

	.logo-bracket,
	.logo-name {
		display: inline-block;
	}

	.bracket-left {
		translate: x-50px;
		opacity: 0;
		transition:
			translate var(--duration-normal) var(--easing-ease-out),
			opacity var(--duration-fast) var(--easing-ease-out);
	}

	.bracket-right {
		translate: x50px;
		opacity: 0;
		transition:
			translate var(--duration-normal) var(--easing-ease-out),
			opacity var(--duration-fast) var(--easing-ease-out);
	}

	.logo-name {
		translate: x0px;
		opacity: 0;
		transition:
			translate var(--duration-normal) var(--easing-ease-out),
			opacity var(--duration-fast) var(--easing-ease-out);
	}

	.logo-last {
		color: var(--primary-teal-pale);
	}

	/*////the part*/

	.burger {
		grid-column: -3;
		justify-self: end;
		align-self: center;
	}

	.menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;

		overflow: hidden;
		background: color-mix(in srgb, var(--background-dark-alt) 94%, transparent);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		box-shadow: 0 20px 30px rgba(11, 28, 48, 0.25);

		opacity: 0;
		transition:
			grid-template-rows var(--duration-normal) var(--easing-ease-out),
			opacity var(--duration-fast) var(--easing-ease-out);

		display: grid;
		grid-template-rows: 0fr 0fr;
		grid-column: 1 / -1;
		justify-self: stretch;

		&.is-open {
			grid-template-rows: 2fr 0.5fr;
			opacity: 1;
		}

		.bfd-nav__palette {
			grid-column: 1 / -1;
			grid-row: 2;
			align-self: center;
			justify-self: center;
		}

		@media (min-width: 1175px) {
			position: initial;
			opacity: 1;
			background: transparent;
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
			box-shadow: none;
			overflow: initial;

			display: flex;
			justify-content: space-between;
			grid-column: 6 / -2;
		}
	}

	.nav-links {
		min-height: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.4rem;
		padding: 1.2rem 2.4rem 2.8rem;

		@media (min-width: 1175px) {
			gap: 2.4rem;
			padding: 0;
		}
	}

	.nav a {
		padding: 1.2rem 0;
		font-size: 2rem;
		border-bottom: 1px solid color-mix(in srgb, var(--text-primary) 12%, transparent);

		@media (min-width: 820px) {
			font-size: 2.4rem;
		}
	}

	@media (min-width: 1175px) {
		.burger {
			display: none;
		}

		.nav-links {
			flex-flow: row nowrap;

			li {
				translate: 0 -10px;
				opacity: 0;
			}
		}

		.nav {
			display: flex;
			gap: clamp(1.4rem, 2vw, 3rem);

			grid-column: 4 / -4;
			align-self: center;
			justify-self: center;
		}
		.nav a {
			font-family: var(--font-accent);
			font-weight: 600;
			font-size: 1.8rem;
			color: var(--text-secondary);
			text-decoration: none;
			transition: color var(--duration-fast) ease;

			&:hover {
				color: var(--primary-teal-bright);
			}
		}
	}
</style>
