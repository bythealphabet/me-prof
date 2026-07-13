<script lang="ts">
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import {
		getPalette,
		getTheme,
		setPalette,
		toggleTheme,
		type Palette
	} from '$lib/state/theme.svelte';

	const PALETTES: { id: Palette; label: string; dot: string }[] = [
		{ id: 'blue', label: 'Blue', dot: '#2563eb' },
		{ id: 'green', label: 'Ocean', dot: '#0d9488' },
		{ id: 'wood', label: 'Wood', dot: '#b45309' }
	];
</script>

<div class="bfd-palette-ctrl">
	<div class="bfd-palette-ctrl__swatches">
		{#each PALETTES as p (p.id)}
			<button
				class="bfd-palette-ctrl__sw"
				class:is-active={getPalette() === p.id}
				style="background: {p.dot}"
				aria-label="{p.label} palette"
				aria-pressed={getPalette() === p.id}
				onclick={() => setPalette(p.id)}
			></button>
		{/each}
	</div>
	<button class="bfd-palette-ctrl__theme" onclick={toggleTheme} aria-label="Toggle dark / light">
		{#if getTheme() === 'dark'}
			<Moon size={18} />
		{:else}
			<Sun size={18} />
		{/if}
	</button>
</div>

<style>
	.bfd-palette-ctrl {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1.2rem;

		grid-column: -1/ -4;
	}
	.bfd-palette-ctrl__swatches {
		display: flex;
		gap: 0.6rem;

		@media (min-width: 820px) {
			flex-flow: row nowrap;
		}
	}
	.bfd-palette-ctrl__sw {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		border: 2px solid transparent;
		cursor: pointer;
		padding: 0;
		transition:
			transform var(--duration-fast) ease,
			border-color var(--duration-fast) ease;
	}
	.bfd-palette-ctrl__sw:hover {
		transform: scale(1.15);
	}
	.bfd-palette-ctrl__sw.is-active {
		border-color: var(--text-primary);
	}
	.bfd-palette-ctrl__theme {
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3.4rem;
		height: 3.4rem;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		background: color-mix(in srgb, var(--background-card) 80%, var(--primary-blue) 20%);
		color: var(--primary-teal-pale, var(--primary-blue-pale));
	}
</style>
