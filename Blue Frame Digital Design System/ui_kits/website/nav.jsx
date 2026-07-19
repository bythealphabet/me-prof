/* Blue Frame Digital — UI kit: top nav + theme/palette control.
   Exports SiteNav and PaletteControl to window for the other kit scripts. */

const { useState, useEffect } = React;

const PALETTES = [
	{ id: 'blue', label: 'Blue', dot: '#2563eb' },
	{ id: 'green', label: 'Ocean', dot: '#0d9488' },
	{ id: 'wood', label: 'Wood', dot: '#b45309' }
];

function PaletteControl() {
	const [palette, setPalette] = useState(
		() => document.documentElement.dataset.palette || 'blue'
	);
	const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');

	useEffect(() => {
		document.documentElement.dataset.palette = palette;
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('bfd-palette', palette);
			localStorage.setItem('bfd-theme', theme);
		} catch (e) {}
	}, [palette, theme]);

	return (
		<div className="bfd-palette-ctrl">
			<div className="bfd-palette-ctrl__swatches">
				{PALETTES.map((p) => (
					<button
						key={p.id}
						className={'bfd-palette-ctrl__sw' + (palette === p.id ? ' is-active' : '')}
						style={{ background: p.dot }}
						aria-label={p.label + ' palette'}
						aria-pressed={palette === p.id}
						onClick={() => setPalette(p.id)}
					/>
				))}
			</div>
			<button
				className="bfd-palette-ctrl__theme"
				onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
				aria-label="Toggle dark / light"
			>
				<window.Icon name={theme === 'dark' ? 'moon' : 'sun'} size={18} />
			</button>
		</div>
	);
}

function SiteNav({ onNav }) {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 30);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const links = [
		['Services', 'services'],
		['Why Us', 'about'],
		['Pricing', 'pricing'],
		['Contact', 'contact']
	];

	return (
		<header className={'bfd-nav' + (scrolled ? ' is-scrolled' : '')}>
			<a className="bfd-nav__logo" href="#top" onClick={(e) => { e.preventDefault(); onNav('top'); }}>
				Blue<span>Frame</span> Digital
			</a>
			<nav className="bfd-nav__links">
				{links.map(([label, id]) => (
					<a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); onNav(id); }}>
						{label}
					</a>
				))}
			</nav>
			<PaletteControl />
		</header>
	);
}

Object.assign(window, { SiteNav, PaletteControl });
