export type Palette = 'blue' | 'green' | 'wood';
export type Theme = 'dark' | 'light';

function readInitial<T extends string>(key: string, fallback: T): T {
	if (typeof document === 'undefined') return fallback;
	const attr = key === 'bfd-palette' ? 'palette' : 'theme';
	return (document.documentElement.dataset[attr] as T | undefined) ?? fallback;
}

let palette = $state<Palette>(readInitial<Palette>('bfd-palette', 'blue'));
let theme = $state<Theme>(readInitial<Theme>('bfd-theme', 'dark'));

function apply() {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.palette = palette;
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem('bfd-palette', palette);
		localStorage.setItem('bfd-theme', theme);
	} catch {
		// storage unavailable (private mode, etc.) — theme still applies for this load
	}
}

export function getPalette() {
	return palette;
}

export function getTheme() {
	return theme;
}

export function setPalette(next: Palette) {
	palette = next;
	apply();
}

export function setTheme(next: Theme) {
	theme = next;
	apply();
}

export function toggleTheme() {
	setTheme(theme === 'dark' ? 'light' : 'dark');
}
